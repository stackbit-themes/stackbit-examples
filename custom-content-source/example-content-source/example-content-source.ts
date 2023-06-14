import type {
    ContentSourceInterface,
    InitOptions,
    Logger,
    Model,
    Locale,
    Document,
    Asset,
    ContentChangeEvent,
    UpdateOperation,
    UpdateOperationField,
    ValidationError,
    Cache,
    User,
    Schema,
    Version
} from '@stackbit/types';

import { ExampleCmsApiClient } from '../example-cms/api-client';
import {
    toStackbitModels,
    toStackbitDocuments,
    toStackbitAssets,
    stackbitUpdatedFieldToExampleFields,
    stackbitUpdatesToExampleFields,
    ExampleModelContext,
    ExampleAssetContext,
    ExampleDocumentContext,
    ExampleSchemaContext
} from './example-source-utils';

/**
 * Define user-specific context properties like user-specific OAuth accessToken.
 * To use UserContext, an OAuth integration between the underlying
 * content source and Stackbit is required.
 * Please reach out to the Stackbit team for more info.
 */
export interface ExampleUserContext {}

/**
 * Define the constructor options of your content source module.
 * Use it to define things like the project identifier in the underlying content
 * source, service-level access keys, and other data needed to read/write data
 * from/to the underlying content source.
 */
export type ContentSourceOptions = {
    projectId: string;
    databaseFilePath?: string;
    siteLocalhost?: string;
};

/**
 * @implements ContentSourceInterface
 */
export class ExampleContentSource
    implements ContentSourceInterface<ExampleUserContext, ExampleSchemaContext, ExampleDocumentContext, ExampleAssetContext, ExampleModelContext>
{
    private readonly projectId: string;
    private readonly databaseFilePath?: string;
    private readonly manageUrl: string;
    private readonly siteLocalhost: string;
    private cache!: Cache<ExampleSchemaContext, ExampleDocumentContext, ExampleAssetContext, ExampleModelContext>;
    private logger!: Logger;
    private userLogger!: Logger;
    private localDev!: boolean;
    private apiClient!: ExampleCmsApiClient;
    private observerId?: string;

    constructor({ projectId, databaseFilePath, siteLocalhost }: ContentSourceOptions) {
        if (!projectId) {
            throw new Error('ExampleContentSource requires projectId');
        }
        this.projectId = projectId;
        this.databaseFilePath = databaseFilePath;
        this.manageUrl = `https://example.com/project/${this.projectId}`;
        this.siteLocalhost = siteLocalhost ?? 'http://localhost:3000';
    }

    getContentSourceType(): string {
        return 'example';
    }

    getProjectId(): string {
        return this.projectId;
    }

    async getVersion(): Promise<Version> {
        return { interfaceVersion: '0.7.3', contentSourceVersion: '0.1' };
    }

    getProjectEnvironment(): string {
        return 'main';
    }

    getProjectManageUrl(): string {
        return this.manageUrl;
    }

    async init({
        logger,
        userLogger,
        localDev,
        webhookUrl,
        cache
    }: InitOptions<ExampleSchemaContext, ExampleDocumentContext, ExampleAssetContext, ExampleModelContext>): Promise<void> {
        this.cache = cache;
        this.apiClient = new ExampleCmsApiClient({
            databaseFilePath: this.databaseFilePath
        });
        this.localDev = localDev;

        // Create new loggers with a custom label. That label will be prepended to log messages.
        this.logger = logger.createLogger({ label: 'example-content-source' });
        this.userLogger = userLogger.createLogger({ label: 'example-content-source' });

        await this.initWebhook(webhookUrl);
        this.logger.info(`initialized content source`);
    }

    /**
     * Setup webhooks between the underlying content source and Stackbit.
     *
     * The webhookUrl is provided in Stackbit Cloud only (localDev === false).
     * To debug webhooks, run `stackbit dev` with the `--csi-webhook-url=...` parameter.
     * Use services such as Ngrok to tunnel webhooks to your local machine.
     *
     * Note: to avoid creating another webhook in your content source each time the content source
     * is initialized, check first if a webhook already exists.
     * @param webhookUrl
     */
    private async initWebhook(webhookUrl: string | undefined) {
        if (webhookUrl) {
            this.logger.info(`checking if stackbit webhook exists`);
            let webhook = await this.apiClient.getWebhook({ name: 'stackbit-content-source' });
            if (!webhook) {
                this.logger.info(`no webhook 'stackbit-content-source' was found, creating a new webhook`);
                const newWebhook = await this.apiClient.createWebhook({ name: 'stackbit-content-source' });
                if (newWebhook) {
                    webhook = newWebhook;
                }
            }
            if (webhook) {
                this.logger.info('got a stackbit-content-source webhook');
            }
        }
    }

    async getSchema(): Promise<Schema<ExampleSchemaContext, ExampleModelContext>> {
        const models = await this.getModels();
        const locales = this.getLocales();
        return {
            context: {},
            models,
            locales
        };
    }

    async startWatchingContentUpdates() {
        if (this.observerId) {
            await this.stopWatchingContentUpdates();
        }
        this.observerId = await this.apiClient.startObservingContentChanges({
            callback: ({ events }) => {
                this.logger.info(`got events: ${JSON.stringify(events, null, 2)}`);
                const contentChanges: ContentChangeEvent<ExampleDocumentContext, ExampleAssetContext> = {
                    documents: [],
                    assets: [],
                    deletedDocumentIds: [],
                    deletedAssetIds: [],
                    scheduledActions: [],
                    deletedScheduledActionIds: []
                };
                for (const event of events) {
                    if (event.name === 'document-created' || event.name === 'document-updated') {
                        const createdDocument = toStackbitDocuments([event.document], this.cache.getModelByName, this.manageUrl)[0];
                        contentChanges.documents.push(createdDocument);
                    } else if (event.name === 'document-deleted') {
                        contentChanges.deletedDocumentIds.push(event.documentId);
                    } else if (event.name === 'asset-created') {
                        const createdAsset = toStackbitAssets([event.asset], this.manageUrl, this.siteLocalhost)[0];
                        contentChanges.assets.push(createdAsset);
                    }
                }
                this.cache.updateContent(contentChanges);
            }
        });
    }

    async stopWatchingContentUpdates(): Promise<void> {
        if (this.observerId) {
            await this.apiClient.stopObservingContentChanges({
                observerId: this.observerId
            });
        }
    }

    private async getModels(): Promise<Model<ExampleModelContext>[]> {
        const models = await this.apiClient.getModels();
        return toStackbitModels(models);
    }

    private getLocales(): Locale[] {
        return []; // No multiple locales in this example
    }

    async getDocuments(): Promise<Document<ExampleDocumentContext>[]> {
        const documents = await this.apiClient.getDocuments();
        return toStackbitDocuments(documents, this.cache.getModelByName, this.manageUrl);
    }

    async getAssets(): Promise<Asset<ExampleAssetContext>[]> {
        const assets = await this.apiClient.getAssets();
        return toStackbitAssets(assets, this.manageUrl, this.siteLocalhost);
    }

    async hasAccess(options: { userContext?: ExampleUserContext }): Promise<{
        hasConnection: boolean;
        hasPermissions: boolean;
    }> {
        if (this.localDev) {
            return { hasConnection: true, hasPermissions: true };
        }
        // Use userContext.accessToken to check if user has write access to this content source
        /*
        if (!options?.userContext?.accessToken) {
            return { hasConnection: false, hasPermissions: false };
        }
        const hasAccess = this.apiClient.hasAccess({
            accessToken: options?.userContext?.accessToken;
        })
        return {
            hasConnection: true,
            hasPermissions: hasAccess
        };
         */
        return { hasConnection: true, hasPermissions: true };
    }

    async createDocument(options: {
        updateOperationFields: Record<string, UpdateOperationField>;
        model: Model<ExampleModelContext>;
        locale?: string;
        defaultLocaleDocumentId?: string;
        userContext?: User<ExampleUserContext>;
    }): Promise<{
        documentId: string;
    }> {
        const fields = stackbitUpdatedFieldToExampleFields(options.updateOperationFields);
        const document = await this.apiClient.createDocument({ type: options.model.name, fields });
        this.logger.info(`created document, id: ${document.id}`);
        return {
            documentId: toStackbitDocuments([document], this.cache.getModelByName, this.manageUrl)[0].id
        };
    }

    async updateDocument(options: {
        document: Document<ExampleDocumentContext>;
        operations: UpdateOperation[];
        userContext?: User<ExampleUserContext>;
    }): Promise<void> {
        this.logger.info(`update document, id: ${options.document.id}, operations: ${JSON.stringify(options.operations, null, 2)}`);
        const fields = stackbitUpdatesToExampleFields(options.operations);
        await this.apiClient.updateDocument({
            documentId: options.document.id,
            fields: fields
        });
    }

    async deleteDocument(options: { document: Document<ExampleDocumentContext>; userContext?: ExampleUserContext }): Promise<void> {
        await this.apiClient.deleteDocument({
            documentId: options.document.id
        });
    }

    async uploadAsset(options: {
        url?: string;
        base64?: string;
        fileName: string;
        mimeType: string;
        locale?: string;
        userContext?: ExampleUserContext;
    }): Promise<Asset<ExampleAssetContext>> {
        if (!options.url) {
            throw new Error('uploading assets from base64 is not supported');
        }

        const asset = await this.apiClient.uploadAsset({
            url: options.url,
            title: options.fileName,
            width: 100,
            height: 100
        });
        return toStackbitAssets([asset], this.manageUrl, this.siteLocalhost)[0];
    }

    async validateDocuments(options: {
        documents: Document<ExampleDocumentContext>[];
        assets: Asset<ExampleAssetContext>[];
        locale?: string;
        userContext?: ExampleUserContext;
    }): Promise<{ errors: ValidationError[] }> {
        return { errors: [] };
    }

    async publishDocuments(options: {
        documents: Document<ExampleDocumentContext>[];
        assets: Asset<ExampleAssetContext>[];
        userContext?: ExampleUserContext;
    }): Promise<void> {
        await this.apiClient.publishDocuments({
            documentIds: options.documents.map((document) => document.id)
        });
    }

    async onWebhook(data: { data: any; headers: Record<string, string> }): Promise<void> {
        return;
    }

    async reset(): Promise<void> {
        return;
    }

    async destroy(): Promise<void> {
        return;
    }
}
