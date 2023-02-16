/*
Access the actual downloaded size of a resource (e.g. image) in bytes, prior to decoding it.
This browser API is not (yet?) supported in all browsers.

In Safari, encodedBodySize isn't available in TP last checked, 
despite green status in https://caniuse.com/?search=encodedBodySize)
*/

export function getLoadedResourceSize(url: string) {
  const entry: PerformanceEntry | undefined =
    window?.performance?.getEntriesByName(url)?.[0];
  return (entry as PerformanceResourceTiming)?.encodedBodySize;
}
