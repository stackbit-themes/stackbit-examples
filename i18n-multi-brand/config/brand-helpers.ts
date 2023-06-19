import { DocumentWithSource, ModelWithSource, OnContentCreateOptions } from '@stackbit/types';
import { getStringField } from './config-helpers';
import {
  STACKBIT_PRESET_TYPE,
  BRAND_FIELD,
  MULTI_BRAND_TYPES,
  BRAND_TYPE,
  BRAND_FIXED_IDENTIFIER_FIELD,
  getCurrentBrandIdentifier,
} from 'utils/common';

const currentBrandIdentifier = getCurrentBrandIdentifier();

export const brandModelExtension = {
  name: BRAND_TYPE,
  singleInstance: true, // User can't create more instances
  readOnly: true, // Can't delete
  fields: [{ name: BRAND_FIXED_IDENTIFIER_FIELD, readOnly: true }], // String ID of brand can't be changed
};

export function hideBrandField(model: ModelWithSource) {
  if (!model.fields[BRAND_FIELD]) return model;

  const newModel = { ...model };
  newModel.fields[BRAND_FIELD] = { ...model.fields[BRAND_FIELD], hidden: true };
  return newModel;
}

function findCurrentBrand(documents: DocumentWithSource[]) {
  const result = documents
    .filter((e) => e.modelName === BRAND_TYPE)
    .find((e) => getStringField(e, 'fixedIdentifier') === currentBrandIdentifier);

  if (!result)
    throw new Error(`[findCurrentBrand] Couldn't find document for brand identifier: {currentBrandIdentifier}`);
  return result;
}

export function setBrandOnContentCreate(options: OnContentCreateOptions) {
  const toplevelModelName = options.model.name;
  let result = { ...options.object };

  console.debug('[setBrandOnContentCreate] object before modification:', JSON.stringify(result, null, 2));

  const currBrand = findCurrentBrand(options.getDocuments());
  const currBrandRef = {
    $$type: currBrand.modelName,
    $$ref: currBrand.id,
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
