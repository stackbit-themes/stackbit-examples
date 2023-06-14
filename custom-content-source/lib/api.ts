import { ExampleCmsApiClient, ExampleAsset, ExampleDocument } from '../example-cms/api-client';

const apiClient = new ExampleCmsApiClient({
    databaseFilePath: process.env.EXAMPLE_DATABASE_FILE
});

export function getApiClient() {
    return apiClient;
}

export async function getAssetById(assetId?: string): Promise<ExampleAsset | null> {
    if (!assetId) {
        return null;
    }
    const assets = await apiClient.getAssets();
    return assets.find((asset) => asset.id === assetId) ?? null;
}

export async function getDocumentById(documentId?: string): Promise<ExampleDocument | null> {
    if (!documentId) {
        return null;
    }
    const documents = await apiClient.getDocuments({ includeEmptyFields: true });
    return documents.find((document) => document.id === documentId) ?? null;
}
