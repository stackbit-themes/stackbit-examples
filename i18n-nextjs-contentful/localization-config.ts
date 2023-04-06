import {
  DocumentWithSource,
  ModelWithSource,
  DocumentStringLikeFieldNonLocalized,
  Model,
  UpdateOperationField,
  ModelMap,
} from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';
import localization from 'utils/localization';

type UserContext = {
  accessToken: string;
};

export class LocalizableContentfulContentSource extends ContentfulContentSource {
  async createDocument(options: {
    updateOperationFields: Record<string, UpdateOperationField>;
    model: Model;
    modelMap: ModelMap;
    locale?: string;
    defaultLocaleDocumentId?: string;
    userContext?: UserContext;
  }) {
    if (!localization.nonLocalizedModels.includes(options.model.name)) {
      const localeField = options.model.fields.find((field) => field.name === 'locale');
      if (localeField) {
        options.updateOperationFields.locale = { type: 'enum', value: options.locale };
      }
    }
    return super.createDocument(options);
  }
}

export function markLocalizedModel(model: ModelWithSource) {
  if (!localization.nonLocalizedModels.includes(model.name)) {
    return {
      ...model,
      localized: true,
    };
  } else {
    return model;
  }
}

export function mapLocalizedDocuments(documents: DocumentWithSource[]) {
  const documentLocale = (document: DocumentWithSource) => {
    const value = (document.fields?.locale as DocumentStringLikeFieldNonLocalized)?.value;
    return value && localization.locales.includes(value) ? value : null;
  };

  return documents.map((document) => {
    if (!localization.nonLocalizedModels.includes(document.modelName)) {
      const locale = documentLocale(document);
      return {
        ...document,
        locale,
      };
    }
    return document;
  });
}
