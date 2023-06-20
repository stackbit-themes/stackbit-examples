import {
  DocumentReferenceFieldNonLocalized,
  DocumentWithSource,
  ModelWithSource,
  OnContentCreateOptions,
} from '@stackbit/types';
import { getLocalizedStringField, getStringField } from './config-helpers';
import { STACKBIT_PRESET_TYPE, BRAND_FIELD, MULTI_BRAND_TYPES, BRAND_TYPE, getCurrentBrandSlug } from 'utils/common';

export const brandModelExtension = {
  name: BRAND_TYPE,
  singleInstance: true, // User can't create more instances
  readOnly: true, // Can't delete
  fields: [{ name: 'slug', readOnly: true }],
};

export function hideBrandField(model: ModelWithSource) {
  if (!model.fields[BRAND_FIELD]) return model;

  const newModel = { ...model };
  newModel.fields[BRAND_FIELD] = { ...model.fields[BRAND_FIELD], hidden: true };
  return newModel;
}

let currentBrandId: string | null = null;

export function resolveCurrentBrand(allDocuments: DocumentWithSource[]) {
  const brandSlug = getCurrentBrandSlug();
  const currBrand = allDocuments
    .filter((doc) => doc.modelName === BRAND_TYPE)
    .find((doc) => getStringField(doc, 'slug') === brandSlug);

  if (!currBrand) throw new Error(`[resolveCurrentBrand] Couldn't find brand document with slug: {brandSlug}`);

  console.log(
    `[resolveCurrentBrand] Brand is: "${getLocalizedStringField(currBrand, 'name')}" (id: "${
      currBrand.id
    }", slug: "${brandSlug}")`,
  );
  currentBrandId = currBrand.id;
}

function assertBrandIdSet() {
  if (!currentBrandId) throw new Error('currentBrandId was not set. Make sure to call resolveCurrentBrand()');
}

export function setBrandOnContentCreate(options: OnContentCreateOptions) {
  assertBrandIdSet();

  const toplevelModelName = options.model.name;
  let result = { ...options.object };

  console.debug('[setBrandOnContentCreate] object before modification:', JSON.stringify(result, null, 2));

  const currBrandRef = {
    $$type: BRAND_TYPE,
    $$ref: currentBrandId,
  };

  if (toplevelModelName === STACKBIT_PRESET_TYPE) {
    const modelOfPreset = result.data?.modelName as string | undefined;

    if (!MULTI_BRAND_TYPES.includes(modelOfPreset)) {
      result[BRAND_FIELD] = currBrandRef;
      console.log(`[setBrandOnContentCreate] New preset "${result.label}"'s brand is set to: ${currBrandRef}`);
    } else {
      console.log(`[setBrandOnContentCreate] New preset "${result.label}" is for a multi-brand content type`);
    }
  } else {
    if (!MULTI_BRAND_TYPES.includes(toplevelModelName)) {
      result = deepSetBrand(result, currBrandRef, toplevelModelName);
    } else {
      console.log(`[setBrandOnContentCreate] Model ${toplevelModelName} is multi-brand, not modifying this object.`);
    }
  }
  console.debug('[setBrandOnContentCreate] object after modification:', JSON.stringify(result, null, 2));

  return result;
}

function deepSetBrand(obj: any, brandRef: object, implicitModelName?: string) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  } else if (obj.$$ref) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((e) => deepSetBrand(e, brandRef));
  }

  const modelName = implicitModelName || obj.$$type;
  if (!modelName) return obj;

  const newObj = {};
  Object.entries(obj).forEach(([k, v]) => {
    newObj[k] = deepSetBrand(v, brandRef);
  });

  if (!MULTI_BRAND_TYPES.includes(modelName)) {
    console.debug(
      `[deepSetBrand] In object of model "${modelName}" previous brand field value was: ${JSON.stringify(
        obj.brand,
      )}, new value will be set to: ${JSON.stringify(brandRef)}`,
    );
    obj.brand = brandRef;
  }
  return obj;
}

export function relevantToBrand(document: DocumentWithSource) {
  assertBrandIdSet();

  if (MULTI_BRAND_TYPES.includes(document.modelName)) {
    return true; // Include all multi-brand docs
  } else if (document.modelName === BRAND_TYPE) {
    return document.id === currentBrandId; // Of brand documents, return only the current one
  } else {
    const referencedBrand = (document.fields[BRAND_FIELD] as DocumentReferenceFieldNonLocalized)?.refId;
    if (referencedBrand) {
      return referencedBrand === currentBrandId;
    } else {
      if (document.modelName === STACKBIT_PRESET_TYPE) {
        return true; // Presets can be multi-brand
      } else {
        console.debug(`[relevantToBrand] document ${document.id} (model: ${document.modelName}) has no brand set.`);
        return false; // Other brand-specific documents should always have the brand field set
      }
    }
  }
}
