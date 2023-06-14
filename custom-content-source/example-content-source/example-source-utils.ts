import type { Model, Field, Document, DocumentField, Asset, UpdateOperation, UpdateOperationField } from '@stackbit/types';
import type { ExampleModel, ExampleDocument, ExampleAsset } from '../example-cms/api-client';

/**
 * Define a custom context for documents, assets, models and the complete schema.
 * This context is stored in the cache and accessible later for any need.
 */
export interface ExampleDocumentContext {}
export interface ExampleAssetContext {}
export interface ExampleModelContext {}
export interface ExampleSchemaContext {}

export function toStackbitModels(models: ExampleModel[]): Model<ExampleModelContext>[] {
    return models.map((model): Model<ExampleModelContext> => {
        return {
            type: 'data',
            name: model.name,
            fields: model.fields.map((field): Field => {
                switch (field.type) {
                    case 'string':
                    case 'text':
                    case 'markdown':
                    case 'date':
                    case 'image':
                        return {
                            type: field.type,
                            name: field.name,
                            required: !!field.required
                        };
                    case 'reference':
                        return {
                            type: 'reference',
                            name: field.name,
                            models: field.allowedTypes
                        };
                    default:
                        const _exhaustiveCheck: never = field;
                        return _exhaustiveCheck;
                }
            })
        };
    });
}

export function toStackbitDocuments(
    documents: ExampleDocument[],
    getModelByName: (modelName: string) => Model | undefined,
    manageUrl: string
): Document<ExampleDocumentContext>[] {
    return documents.map((document): Document<ExampleDocumentContext> => {
        const model = getModelByName(document.type) as Model;
        return {
            type: 'document',
            id: document.id,
            modelName: document.type,
            status: document.status === 'draft' ? 'added' : document.status === 'published' ? 'published' : 'modified',
            manageUrl: manageUrl + '/document/' + document.id,
            context: {},
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
            fields: Object.entries(document.fields).reduce((fields: Record<string, DocumentField>, [fieldName, fieldValue]) => {
                const modelField = model.fields?.find((field) => field.name === fieldName);
                if (!modelField) {
                    return fields;
                }
                switch (modelField.type) {
                    case 'string':
                    case 'url':
                    case 'slug':
                    case 'text':
                    case 'markdown':
                    case 'html':
                    case 'boolean':
                    case 'date':
                    case 'datetime':
                    case 'color':
                    case 'number':
                    case 'enum':
                    case 'file':
                    case 'json':
                    case 'style':
                    case 'richText':
                        fields[fieldName] = {
                            type: modelField.type,
                            value: fieldValue
                        };
                        break;
                    case 'image':
                        if (fieldValue) {
                            fields[fieldName] = {
                                type: 'reference',
                                refType: 'asset',
                                refId: fieldValue
                            };
                        }
                        break;
                    case 'reference':
                        if (fieldValue) {
                            fields[fieldName] = {
                                type: 'reference',
                                refType: 'document',
                                refId: fieldValue
                            };
                        }
                        break;
                    case 'object':
                    case 'model':
                    case 'cross-reference':
                    case 'list':
                        throw new Error(`field of type ${modelField.type} not implemented`);
                    default:
                        const _exhaustiveCheck: never = modelField;
                        return _exhaustiveCheck;
                }
                return fields;
            }, {})
        };
    });
}

export function toStackbitAssets(assets: ExampleAsset[], manageUrl: string, siteLocalhost: string): Asset<ExampleAssetContext>[] {
    return assets.map((asset): Asset<ExampleAssetContext> => {
        return {
            type: 'asset',
            id: asset.id,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
            status: 'published',
            manageUrl: manageUrl + '/assets/' + asset.id,
            context: {},
            fields: {
                title: {
                    type: 'string',
                    value: asset.title
                },
                file: {
                    type: 'assetFile',
                    url: siteLocalhost + asset.url,
                    dimensions: {
                        width: asset.width,
                        height: asset.height
                    }
                }
            }
        };
    });
}

export function stackbitUpdatedFieldToExampleFields(updateOperationFields: Record<string, UpdateOperationField>): Record<string, any> {
    const fields: Record<string, any> = {};
    for (const [fieldName, updateOperationField] of Object.entries(updateOperationFields)) {
        fields[fieldName] = convertUpdateOperationFieldToExampleDocumentField(updateOperationField);
    }
    return fields;
}

export function stackbitUpdatesToExampleFields(updateOperations: UpdateOperation[]): Record<string, any> {
    const fields: Record<string, any> = {};
    for (const operation of updateOperations) {
        if (operation.opType === 'set') {
            const { field, fieldPath } = operation;
            fields[fieldPath[0]] = convertUpdateOperationFieldToExampleDocumentField(field);
        } else if (operation.opType === 'unset') {
            const { fieldPath, modelField } = operation;
            switch (modelField.type) {
                case 'string':
                case 'url':
                case 'slug':
                case 'text':
                case 'markdown':
                case 'html':
                case 'boolean':
                case 'date':
                case 'datetime':
                case 'color':
                case 'number':
                case 'enum':
                case 'file':
                case 'json':
                case 'style':
                case 'richText':
                case 'image':
                case 'reference':
                    fields[fieldPath[0]] = undefined;
                    break;
                case 'object':
                case 'model':
                case 'cross-reference':
                case 'list':
                    throw new Error(`updating field of type ${modelField.type} not implemented`);
                default:
                    const _exhaustiveCheck: never = modelField;
                    return _exhaustiveCheck;
            }
        } else {
            throw new Error(`'${operation.opType}' operation not implemented`);
        }
    }
    return fields;
}

function convertUpdateOperationFieldToExampleDocumentField(updateOperationField: UpdateOperationField) {
    switch (updateOperationField.type) {
        case 'string':
        case 'url':
        case 'slug':
        case 'text':
        case 'markdown':
        case 'html':
        case 'boolean':
        case 'date':
        case 'datetime':
        case 'color':
        case 'number':
        case 'enum':
        case 'file':
        case 'json':
        case 'style':
        case 'richText':
            return updateOperationField.value;
        case 'reference':
            return updateOperationField.refId;
        case 'image':
        case 'object':
        case 'model':
        case 'cross-reference':
        case 'list':
            throw new Error(`updating field of type ${updateOperationField.type} not implemented`);
        default:
            const _exhaustiveCheck: never = updateOperationField;
            return _exhaustiveCheck;
    }
}
