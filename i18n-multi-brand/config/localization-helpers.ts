import {
  ModelWithSource,
  DocumentStringLikeFieldNonLocalized,
  DataModel,
  PageModel,
  OnDocumentCreateOptions,
} from '@stackbit/types';
import localization from 'utils/localization';

// Set the document's locale field (which is custom) to the user's chosen locale
export function setLocaleOnDocumentCreate(options: OnDocumentCreateOptions) {
  const { createDocumentOptions, createDocument } = options;
  const { model, locale, updateOperationFields } = createDocumentOptions;

  if (!localization.nonLocalizedModels.includes(model.name)) {
    const localeField = model.fields.find((field) => field.name === 'locale');
    if (localeField) {
      updateOperationFields.locale = { type: 'enum', value: locale };
    }
  }
  return createDocument(createDocumentOptions);
}

type LocalizableModelWithSource = (DataModel | PageModel) & { srcType: string; srcProjectId: string };

export function setLocalizedModel(model: ModelWithSource): ModelWithSource {
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
