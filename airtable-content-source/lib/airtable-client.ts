import Airtable from 'airtable';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { AirtableTableModel } from './airtable-table-model';
import { AirtableWebhook, AirtableWebhookPayload, AirtableWebhookSpecification } from './airtable-webhook-types';

/**
 * The AirtableClient extends the native Airtable client with additional logic
 * to simulate content preview and content publishing similar to other CMS.
 *
 * To achieve content preview and content publishing, every Airtable record has
 * `State` and `Related` fields. The AirtableClient does not return these
 * fields as regular fields but converts them to state properties of every record.
 *
 * The `Related` field is a link field that may reference a surrogate pair of
 * a published record. The published records represent the "production" content,
 * while their surrogate paris represent their copies with pending changes.
 *
 * The `State` field can have one of the following values:
 * - "draft": A record that has never been published.
 * - "published": A published record that has no pending changes.
 * - "published-has-changes": A published record that has pending changes.
 *       In this state, the `Related` field will reference the surrogate record
 *       with "changed" status and with all the pending changes.
 * - "changed": A copy of the "published" record with the pending changes. In
 *       this state, the `Related` field will reference the surrogate record in
 *       the "published-has-changes" state.
 * - "published-to-be-deleted": A "published" record that has been marked to be
 *       deleted but its deletion was not yet been published.
 * - "deleted": A deleted record.
 *
 * All AirtableClient read methods receive a `preview` flag that specifies if
 * the client needs to return records representing the non-published content or
 * records representing the published content.
 *
 * When the `preview` flag is true, the client will return records with `draft`,
 * `published` and `changed` statuses. In addition, the records with the
 * `changed` status will have their ids replaced with the ids of the surrogate
 * `published-has-changes` records to ensure that the consumer of the client
 * always sees the same ID. The original ID of the `changed` record will be
 * stored in the `changedRecordId` property.
 *
 * When the `preview` flag is false, the client will return records with
 * `published`, `published-has-changes` and `published-to-be-deleted` statuses.
 */

export type AirtableRecordPublishState = 'draft' | 'changed' | 'deleted' | 'published' | 'published-has-changes' | 'published-to-be-deleted';

// Airtable does return 'width' and 'height' in the Attachment, but the Airtable.Attachment type doesn't define it.
export interface ExtendedAttachment extends Airtable.Attachment {
    width: number;
    height: number;
}

export type AirtableFieldType = Airtable.FieldSet[keyof Airtable.FieldSet];

export interface StateFields extends Airtable.FieldSet {
    State: AirtableRecordPublishState;
    Related?: ReadonlyArray<string>;
}

export interface PostRecordFields extends StateFields {
    Title: string;
    Slug: string;
    Date?: string;
    CoverImage?: ExtendedAttachment[];
    Excerpt?: string;
    Author?: string[];
    OGImage?: ExtendedAttachment[];
    Content?: string;
}

export interface AuthorRecordFields extends StateFields {
    Name: string;
    Picture?: ExtendedAttachment[];
}

export interface AssetRecordFields extends Airtable.FieldSet {
    Title: string;
    Description?: string;
    Asset: ExtendedAttachment[];
}

export type StatefulRecord<Fields extends Airtable.FieldSet> = {
    id: string;
    tableId: string;
    createdTime: string;
    status: AirtableRecordPublishState;
    fields: Fields;
} & (
    | {
          status: 'draft' | 'deleted' | 'published' | 'published-to-be-deleted';
      }
    | {
          status: 'changed' | 'published-has-changes';
          changedRecordId: string;
      }
);

export function getAirtableClient() {
    if (!process.env.AIRTABLE_BASE_ID) {
        throw new Error('AIRTABLE_BASE_ID environment variable is not set');
    }
    if (!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN) {
        throw new Error('AIRTABLE_PERSONAL_ACCESS_TOKEN environment variable is not set');
    }
    return new AirtableClient({
        baseId: process.env.AIRTABLE_BASE_ID,
        personalAccessToken: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN
    });
}

// requiring axios dynamically, otherwise, after stackbit.config.ts is built
// and bundled by esbuild, it having issues loading axios as ESM module.
let axiosInstance: AxiosInstance | undefined;
async function axios<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    if (!axiosInstance) {
        axiosInstance = await require('axios');
    }
    if (!axiosInstance) {
        throw new Error('could not load Axios module');
    }
    try {
        return axiosInstance(config);
    } catch (error: any) {
        let message = 'error retrieving Airtable table models';
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            message += `, status: ${error.response.status}, data: ${JSON.stringify(error.response.data)}`;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            message += `, request: ${error.request.toString()}`;
        } else {
            // Something happened in setting up the request that triggered an Error
            message += `, error: ${error.message}`;
        }
        throw new Error(message);
    }
}

export class AirtableClient {
    private readonly baseId: string;
    private readonly client: Airtable;
    private readonly base: Airtable.Base;
    private readonly personalAccessToken: string;

    constructor(options: { baseId: string; personalAccessToken: string }) {
        if (!options.personalAccessToken) {
            throw new Error('AirtableClient error: personalAccessToken was not provided');
        }
        if (!options.baseId) {
            throw new Error('AirtableClient error: baseId was not provided');
        }
        this.baseId = options.baseId;
        this.personalAccessToken = options.personalAccessToken;
        this.client = new Airtable({ apiKey: options.personalAccessToken });
        this.base = this.client.base(this.baseId);
    }

    async getTableModels({ includeAssetsTable = false }: { includeAssetsTable?: boolean } = {}): Promise<AirtableTableModel[]> {
        const response = await axios({
            method: 'GET',
            baseURL: 'https://api.airtable.com/v0/',
            headers: { Authorization: `Bearer ${this.personalAccessToken}` },
            url: `meta/bases/${this.baseId}/tables`
        });
        const tables = (response.data.tables as AirtableTableModel[]).filter((table) => includeAssetsTable || table.name !== 'Assets');
        return tables.map((table) => {
            const { fields, ...rest } = table;
            return {
                ...rest,
                fields: fields.filter((field) => {
                    if (['State', 'Related'].includes(field.name)) {
                        return false;
                    }
                    if (table.name === 'Authors' && field.name === 'Post') {
                        return false;
                    }
                    return true;
                })
            };
        });
    }

    async getAllStatefulRecords<Fields extends StateFields>({
        preview,
        includeToBeDeleted
    }: {
        preview?: boolean;
        includeToBeDeleted?: boolean;
    }): Promise<StatefulRecord<Fields>[]> {
        const tables = await this.getTableModels();
        let allRecords: StatefulRecord<Fields>[] = [];
        for (const table of tables) {
            const records = await this.getStatefulRecordsForTable<Fields>({ tableId: table.id, preview, includeToBeDeleted });
            allRecords = allRecords.concat(records);
        }
        return allRecords;
    }

    async getStatefulRecordsForTable<Fields extends StateFields>({
        tableId,
        fields,
        filter,
        sort,
        preview = false,
        includeToBeDeleted = false
    }: {
        tableId: string;
        fields?: string[];
        filter?: Record<string, any>;
        sort?: { field: string; direction?: 'asc' | 'desc' }[];
        preview?: boolean;
        includeToBeDeleted?: boolean;
    }): Promise<StatefulRecord<Fields>[]> {
        if (fields) {
            fields = fields.concat(['State', 'Related']);
        }
        const records = await this.getAirtableRecordsForTable<Fields>({
            tableId,
            fields,
            filter,
            sort
        });
        const mappedRecords: StatefulRecord<Fields>[] = [];
        for (const record of records) {
            if (preview) {
                const statusList = ['draft', 'changed', 'published'];
                if (includeToBeDeleted) {
                    statusList.push('published-to-be-deleted');
                }
                if (statusList.includes(record.fields.State)) {
                    mappedRecords.push(convertAirtableRecordToStatefulRecord(record, tableId));
                }
            } else if (['published', 'published-has-changes', 'published-to-be-deleted'].includes(record.fields.State)) {
                mappedRecords.push(convertAirtableRecordToStatefulRecord(record, tableId));
            }
        }
        return mappedRecords;
    }

    async getAirtableRecordsForTable<Fields extends StateFields | AssetRecordFields>({
        tableId,
        fields,
        filter,
        sort
    }: {
        tableId: string;
        fields?: string[];
        filter?: Record<string, any>;
        sort?: { field: string; direction?: 'asc' | 'desc' }[];
    }): Promise<Airtable.Records<Fields>> {
        const params: Airtable.SelectOptions<Fields> = {};
        if (fields) {
            params.fields = fields.concat('State');
        }
        if (sort) {
            params.sort = sort;
        }
        if (filter) {
            const fieldExpressions: string[] = [];
            for (const [key, value] of Object.entries(filter)) {
                fieldExpressions.push(`{${key}}="${value}"`);
            }
            if (fieldExpressions.length > 1) {
                params.filterByFormula = `AND(${fieldExpressions.join(',')})`;
            } else {
                params.filterByFormula = fieldExpressions[0];
            }
        }
        const table = this.base<Fields>(tableId);
        const query = table.select(params);
        return await query.all();
    }

    async getStatefulRecordById<Fields extends StateFields>({
        tableId,
        recordId,
        preview = false,
        includeToBeDeleted = false
    }: {
        tableId: string;
        recordId: string;
        preview?: boolean;
        includeToBeDeleted?: boolean;
    }): Promise<StatefulRecord<Fields> | null> {
        const record = await this.getAirtableRecordById<Fields>({ tableId, recordId });
        if (!record) {
            return null;
        }
        switch (record.fields.State) {
            case 'draft':
                if (preview) {
                    return convertAirtableRecordToStatefulRecord(record, tableId);
                }
                return null;
            case 'changed':
                if (preview) {
                    return convertAirtableRecordToStatefulRecord(record, tableId);
                }
                return this.getStatefulRecordById({
                    tableId,
                    recordId: record.fields.Related![0],
                    preview
                });
            case 'published':
                return convertAirtableRecordToStatefulRecord(record, tableId);
            case 'published-has-changes':
                if (preview) {
                    return this.getStatefulRecordById({
                        tableId,
                        recordId: record.fields.Related![0],
                        preview
                    });
                }
                return convertAirtableRecordToStatefulRecord(record, tableId);
            case 'published-to-be-deleted':
                return includeToBeDeleted ? convertAirtableRecordToStatefulRecord(record, tableId) : null;
            case 'deleted':
                return null;
        }
    }

    async getAirtableRecordById<Fields extends Airtable.FieldSet>({
        tableId,
        recordId
    }: {
        tableId: string;
        recordId: string;
    }): Promise<Airtable.Record<Fields> | null> {
        const table = this.base<Fields>(tableId);
        return await table.find(recordId);
    }

    async createRecord<Fields extends StateFields>({ tableId, fields }: { tableId: string; fields: Partial<Fields> }): Promise<StatefulRecord<Fields>> {
        if (!('State' in fields)) {
            fields = {
                ...fields,
                State: 'draft'
            };
        }
        const record = await this.base<Fields>(tableId).create(fields);
        return convertAirtableRecordToStatefulRecord(record, tableId);
    }

    async createAsset({ url, filename }: { url: string; filename: string }): Promise<Airtable.Record<AssetRecordFields>> {
        return await this.base<AssetRecordFields>('Assets').create({
            Title: filename,
            Asset: [
                {
                    url,
                    filename
                } as ExtendedAttachment
            ]
        });
    }

    async updateRecord<Fields extends StateFields>({
        tableId,
        recordId,
        fields
    }: {
        tableId: string;
        recordId: string;
        fields: Partial<Fields>;
    }): Promise<StatefulRecord<Fields>> {
        const record = await this.getStatefulRecordById({
            tableId: tableId,
            recordId: recordId,
            preview: true
        });
        if (!record) {
            throw new Error(`record in table '${tableId}' with id '${recordId}' was not found`);
        }
        if (record.status === 'published') {
            const changedRecord = await this.createRecord<StateFields>({
                tableId: record.tableId,
                fields: {
                    ...record.fields,
                    ...fields,
                    Related: [record.id],
                    State: 'changed'
                }
            });
            await this.base(record.tableId).update(record.id, {
                State: 'published-has-changes',
                Related: [(changedRecord as StatefulRecord<Fields> & { status: 'changed' }).changedRecordId]
            });
            return changedRecord as StatefulRecord<Fields>;
        } else if (record.status === 'draft') {
            // the changed record has the id of the published one, use context.id to get the actual id
            const draftRecord = await this.base<Fields>(record.tableId).update(record.id, fields);
            return convertAirtableRecordToStatefulRecord(draftRecord, tableId);
        } else if (record.status === 'changed') {
            const changedRecord = await this.base<Fields>(record.tableId).update(record.changedRecordId, fields);
            return convertAirtableRecordToStatefulRecord(changedRecord, tableId);
        }
        throw new Error(
            `updating record fields in '${record.status}' status is not allowed, records can only be updated in 'draft', 'published' and 'changed' statuses`
        );
    }

    async deleteRecord({ tableId, recordId }: { tableId: string; recordId: string }) {
        const record = await this.getStatefulRecordById({
            tableId: tableId,
            recordId: recordId,
            preview: true
        });
        if (!record) {
            throw new Error(`record in table '${tableId}' with id '${recordId}' was not found`);
        }
        if (record.status === 'published') {
            return await this.base(tableId).update(recordId, { State: 'published-deleted' });
        } else if (record.status === 'draft') {
            return await this.base(tableId).update(recordId, { State: 'deleted' });
        } else if (record.status === 'changed') {
            const deletedRecord = await this.base(tableId).update(record.id, { State: 'published-deleted' });
            await this.base(tableId).destroy(record.changedRecordId);
            return deletedRecord;
        }
        throw new Error(
            `deleting record in '${record.status}' status is not allowed, records can only be deleted in 'draft', 'published' and 'changed' statuses`
        );
    }

    async publishRecords({
        recordsMeta
    }: {
        recordsMeta: { tableId: string; recordId: string }[];
    }): Promise<{ publishedRecords: StatefulRecord<StateFields>[]; deletedRecordsIds: string[] }> {
        const publishedRecords: StatefulRecord<StateFields>[] = [];
        const deletedRecordsIds: string[] = [];
        for (const recordMeta of recordsMeta) {
            const record = await this.getStatefulRecordById({
                tableId: recordMeta.tableId,
                recordId: recordMeta.recordId,
                preview: true,
                includeToBeDeleted: true
            });
            if (!record) {
                throw new Error(`record in table '${recordMeta.tableId}' with id '${recordMeta.tableId}' was not found`);
            }
            if (record.status === 'draft') {
                const publishedRecord = await this.base<StateFields>(record.tableId).update(record.id, { State: 'published' });
                publishedRecords.push(convertAirtableRecordToStatefulRecord(publishedRecord, recordMeta.tableId));
            } else if (record.status === 'changed') {
                const publishedRecord = await this.base<StateFields>(record.tableId).replace(record.id, {
                    ...record.fields,
                    State: 'published',
                    Related: []
                });
                publishedRecords.push(convertAirtableRecordToStatefulRecord(publishedRecord, recordMeta.tableId));
                await this.base(record.tableId).destroy(record.changedRecordId);
            } else if (record.status === 'published-to-be-deleted') {
                await this.base(record.tableId).update(record.id, { State: 'deleted' });
                deletedRecordsIds.push(record.id);
            } else {
                throw new Error(
                    `publishing records in '${record.status}' status is not allowed, records can only be published in 'draft', 'published' and 'published-to-be-deleted' statuses`
                );
            }
        }
        return {
            publishedRecords,
            deletedRecordsIds
        };
    }

    async getWebhook({ webhookId, webhookUrl }: { webhookId?: string; webhookUrl?: string }): Promise<AirtableWebhook | undefined> {
        const response = await axios({
            method: 'GET',
            baseURL: 'https://api.airtable.com/v0/',
            headers: { Authorization: `Bearer ${this.personalAccessToken}` },
            url: `bases/${this.baseId}/webhooks`
        });
        const webhooks: AirtableWebhook[] = response.data.webhooks ?? [];
        return webhooks.find((webhook: any) => webhook.id === webhookId || webhook.notificationUrl === webhookUrl);
    }

    async createWebhook({ webhookUrl }: { webhookUrl: string }): Promise<{ id: string; macSecretBase64: string; expirationTime?: string }> {
        const specification: AirtableWebhookSpecification = {
            filters: {
                dataTypes: ['tableData', 'tableFields']
            }
        };
        const response = await axios({
            method: 'POST',
            baseURL: 'https://api.airtable.com/v0/',
            headers: { Authorization: `Bearer ${this.personalAccessToken}` },
            url: `bases/${this.baseId}/webhooks`,
            data: {
                notificationUrl: webhookUrl,
                specification: {
                    options: specification
                }
            }
        });
        return response.data;
    }

    async getWebhookPayloads({
        webhookId,
        cursor
    }: {
        webhookId: string;
        cursor?: number;
    }): Promise<{ cursor: number; mightHaveMore: boolean; payloads: AirtableWebhookPayload[] }> {
        const response = await axios({
            method: 'GET',
            baseURL: 'https://api.airtable.com/v0/',
            headers: { Authorization: `Bearer ${this.personalAccessToken}` },
            url: `bases/${this.baseId}/webhooks/${webhookId}/payloads`,
            ...(typeof cursor !== 'undefined' ? { params: { cursor } } : {})
        });
        return response.data;
    }
}

function convertAirtableRecordToStatefulRecord<Fields extends StateFields>(record: Airtable.Record<Fields>, tableId: string): StatefulRecord<Fields> {
    const State = record.fields.State;
    const Related = record.fields.Related;
    return {
        id: State === 'changed' ? Related![0] : record.id,
        tableId: tableId,
        createdTime: record._rawJson.createdTime,
        ...(State === 'changed'
            ? {
                  status: State,
                  changedRecordId: record.id
              }
            : State === 'published-has-changes'
            ? {
                  status: State,
                  changedRecordId: Related![0]
              }
            : {
                  status: State
              }),
        fields: record.fields
    };
}
