import path from 'path';
import fs from 'fs/promises';
const { v4: uuidv4 } = require('uuid');

export interface ExampleCmsApiClientOptions {
    /** A projectId within the content source (provided for example, not used). */
    projectId?: string;
    /** A "service-level" access token to fetch models and content (provided for example, not used). */
    accessToken?: string;
    /** A flag indicating if the "published" or "changed" and "draft" content should be returned (provided for example, not used). */
    preview?: true;
    /** The path for the database file */
    databaseFilePath?: string;
}

interface ExampleData {
    models: ExampleModel[];
    documents: ExampleDocument[];
    assets: ExampleAsset[];
}

export interface ExampleModel {
    name: string;
    fields: ExampleModelField[];
}

export type ExampleModelField =
    | {
          type: 'string' | 'text' | 'markdown' | 'date' | 'image';
          name: string;
          required?: boolean;
      }
    | {
          type: 'reference';
          name: string;
          allowedTypes: string[];
      };

export type ExampleDocumentFields = Record<string, any>;

export interface ExampleDocument {
    /** The document's database ID */
    id: string;
    /** The document's type that matches the model name */
    type: string;
    createdAt: string;
    updatedAt: string;
    /**
     * Document's publish status.
     * This is only an example, marking a document as 'changed' won't preserve its published state.
     */
    status: 'draft' | 'published' | 'changed';
    /** the document's fields matching the model fields */
    fields: ExampleDocumentFields;
}

export interface ExampleAsset {
    id: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    title: string;
    width: number;
    height: number;
}

export type ExampleContentChangeEvent =
    | {
          name: 'document-created' | 'document-updated';
          document: ExampleDocument;
      }
    | {
          name: 'document-deleted';
          documentId: string;
      }
    | {
          name: 'asset-created';
          asset: ExampleAsset;
      };

export interface ExampleWebhook {
    name: string;
}

/**
 * All ExampleApiClient methods are asynchronous to simulate a real API client.
 * All content mutation methods schedule an asynchronous event with a short
 * delay to simulate a real world use case of a headless CMS pushing the updated
 * content to CDN.
 */
export class ExampleCmsApiClient {
    private readonly databaseFilePath: string;
    private webhooks: ExampleWebhook[] = [];
    private contentChangeObservers: {
        id: string;
        callback: (options: { observerId: string; events: ExampleContentChangeEvent[] }) => void;
    }[] = [];

    constructor(options: ExampleCmsApiClientOptions) {
        // ...
        this.databaseFilePath = options.databaseFilePath ?? path.join(process.cwd(), 'example-cms/database.json');
    }

    async getModels(): Promise<ExampleModel[]> {
        await networkDelay();
        const data = await this.loadData();
        return data.models;
    }

    async getDocuments(options?: { type?: string; includeEmptyFields?: boolean }): Promise<ExampleDocument[]> {
        await networkDelay();
        const data = await this.loadData();
        let documents = data.documents;
        if (options?.type) {
            documents = documents.filter((document) => document.type === options.type);
        }
        if (options?.includeEmptyFields) {
            for (const document of documents) {
                const model = data.models.find((model) => model.name === document.type);
                if (!model) continue;
                for (const field of model.fields) {
                    if (typeof document.fields[field.name] === 'undefined') {
                        document.fields[field.name] = null;
                    }
                }
            }
        }
        return documents;
    }

    async getAssets(): Promise<ExampleAsset[]> {
        await networkDelay();
        const data = await this.loadData();
        return data.assets;
    }

    async createDocument(options: { type: string; fields: Record<string, any> }): Promise<ExampleDocument> {
        await networkDelay();
        const date = new Date().toISOString();
        const document: ExampleDocument = {
            id: uuidv4(),
            type: options.type,
            createdAt: date,
            updatedAt: date,
            status: 'draft',
            fields: options.fields
        };
        const data = await this.loadData();
        data.documents.push(document);
        await this.saveData(data);
        this.notifyObservers({
            events: [
                {
                    name: 'document-created',
                    document: document
                }
            ]
        });
        return document;
    }

    async updateDocument(options: { documentId: string; fields: Record<string, any> }): Promise<ExampleDocument> {
        await networkDelay();
        const data = await this.loadData();
        const document = data.documents.find((document) => document.id === options.documentId);
        if (!document) {
            throw new Error(`'document with id '${options.documentId}' not found`);
        }
        Object.assign(document.fields, options.fields, {
            updatedAt: new Date().toISOString(),
            status: 'changed'
        });
        await this.saveData(data);
        this.notifyObservers({
            events: [
                {
                    name: 'document-updated',
                    document: document
                }
            ]
        });
        return document;
    }

    async deleteDocument(options: { documentId: string }): Promise<void> {
        await networkDelay();
        const data = await this.loadData();
        const index = data.documents.findIndex((document) => document.id === options.documentId);
        if (index !== -1) {
            data.documents.splice(index, 1);
            await this.saveData(data);
            this.notifyObservers({
                events: [
                    {
                        name: 'document-deleted',
                        documentId: options.documentId
                    }
                ]
            });
        }
    }

    async publishDocuments(options: { documentIds: string[] }): Promise<void> {
        await networkDelay();
        const data = await this.loadData();
        const updatedDocuments: ExampleDocument[] = [];
        for (const documentId of options.documentIds) {
            const document = data.documents.find((document) => document.id === documentId);
            if (document) {
                document.status = 'published';
                updatedDocuments.push(document);
            }
        }
        await this.saveData(data);
        this.notifyObservers({
            events: updatedDocuments.map((document) => ({
                name: 'document-updated',
                document: document
            }))
        });
    }

    async uploadAsset(options: { url: string; title: string; width: number; height: number }): Promise<ExampleAsset> {
        await networkDelay();
        const date = new Date().toISOString();
        const asset: ExampleAsset = {
            id: uuidv4(),
            createdAt: date,
            updatedAt: date,
            url: options.url,
            title: options.title,
            width: options.width,
            height: options.height
        };
        const data = await this.loadData();
        data.assets.push(asset);
        await this.saveData(data);
        this.notifyObservers({
            events: [
                {
                    name: 'asset-created',
                    asset: asset
                }
            ]
        });
        return asset;
    }

    async startObservingContentChanges(options: { callback: (options: { observerId: string; events: ExampleContentChangeEvent[] }) => void }): Promise<string> {
        await networkDelay();
        const observerId = uuidv4();
        this.contentChangeObservers.push({
            id: observerId,
            callback: options.callback
        });
        return observerId;
    }

    async stopObservingContentChanges(options: { observerId: string }): Promise<void> {
        await networkDelay();
        const index = this.contentChangeObservers.findIndex((observer) => observer.id === options.observerId);
        if (index !== -1) {
            this.contentChangeObservers.splice(index, 1);
        }
    }

    async getWebhook(options: { name: string }): Promise<ExampleWebhook | undefined> {
        await networkDelay();
        return this.webhooks.find((webhook) => webhook.name === options.name);
    }

    async createWebhook(options: { name: string }): Promise<ExampleWebhook> {
        await networkDelay();
        const webhook = { name: options.name };
        this.webhooks.push(webhook);
        return webhook;
    }

    private notifyObservers({ delay = 200, events }: { delay?: number; events: ExampleContentChangeEvent[] }): void {
        networkDelay(delay).then(() => {
            for (const observer of this.contentChangeObservers) {
                observer.callback({
                    observerId: observer.id,
                    events: events
                });
            }
        });
    }

    private async loadData(): Promise<ExampleData> {
        const json = await fs.readFile(this.databaseFilePath, 'utf-8');
        return JSON.parse(json);
    }

    private async saveData(data: ExampleData) {
        const json = JSON.stringify(data, null, 4);
        await fs.writeFile(this.databaseFilePath, json, 'utf-8');
    }
}

function networkDelay(delay: number = 200) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}
