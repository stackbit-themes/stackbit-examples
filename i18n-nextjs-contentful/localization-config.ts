import {
  ModelWithSource,
  DocumentStringLikeFieldNonLocalized,
  Model,
  UpdateOperationField,
  ModelMap,
  DataModel,
  PageModel,
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

type LocalizableModelWithSource = (DataModel | PageModel) & { srcType: string; srcProjectId: string };

export function markLocalizedModel(model: ModelWithSource): ModelWithSource {
  if (!localization.nonLocalizedModels.includes(model.name)) {
    model = model as LocalizableModelWithSource;
    return {
      ...model,
      localized: true,
      locale: ({ document }) => {
        return (document.fields['locale'] as DocumentStringLikeFieldNonLocalized)?.value;
      },
    };
  } else {
    return model;
  }
}
