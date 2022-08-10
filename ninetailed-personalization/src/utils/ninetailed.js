import { getEntries } from "./contentful";
import { createContext, useContext, useState } from "react";

/*
  Get and cache mapping of Ninetailed audience ID => Audience name.
  TODO Invalidate when needed (e.g. capture content change event in app component, see https://docs.stackbit.com/reference/automatic-content-reload/#capturing_handling_change_events)
*/

const TYPE_NINETAILED_AUDIENCE = "nt_audience";

async function getData() {
  const audiences = await getEntries(TYPE_NINETAILED_AUDIENCE);
  const result = Object.fromEntries(
    audiences.map((audience) => [audience.fields.nt_audience_id, audience.fields.nt_name])
  );
  console.log("Fetched Ninetailed audiences:\n", result);
  return result;
}

let cachedAudiences = null;

export async function getAudiencesMap(fromCache = true) {
  if (fromCache) {
    if (cachedAudiences === null) {
      cachedAudiences = await getData();
    }
    return cachedAudiences;
  } else {
    return await getData();
  }
}

/* 
  Persist the user-select variant in personalized components (see withPersonalization), 
  so that editing content or navigation will not reset the component to its default (i.e. show the personalized variant).
  However, doing a hard page reload does mean a new context (TODO persist to local storage as well!)
  
  Mapping is: baseline variant ID (Contentful object ID) => selected variant ID, regardless of where the baseline is shown.
*/

const VariantChoicesContext = createContext();

export function VariantChoicesProvider({ children }) {
  const [choices, setChoices] = useState({});

  function updateChoice(baselineVariantId, userSelectedVariantId) {
    const updatedChoices = { ...choices };
    updatedChoices[baselineVariantId] = userSelectedVariantId;
    setChoices(updatedChoices);
  }

  let sharedState = { choices, updateChoice };
  return (
    <VariantChoicesContext.Provider value={sharedState}>
      {children}
    </VariantChoicesContext.Provider>
  );
}

export function useVariantChoicesContext() {
  return useContext(VariantChoicesContext);
}
