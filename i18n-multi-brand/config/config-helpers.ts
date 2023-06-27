import {
  DocumentStringLikeFieldNonLocalized,
  DocumentWithSource,
  DocumentStringLikeFieldLocalized,
} from '@stackbit/types';
import localization from 'utils/localization';

export function getStringField(document: DocumentWithSource, fieldName: string) {
  return (document.fields[fieldName] as DocumentStringLikeFieldNonLocalized)?.value;
}

export function getLocalizedStringField(document: DocumentWithSource, fieldName: string, locale?: string) {
  locale = locale || localization.defaultLocale;
  return (document.fields[fieldName] as DocumentStringLikeFieldLocalized)?.locales?.[locale]?.value;
}
