const cloudinaryUrlRegex = /^(https?:\/\/[^\/]+\/(?:[^\/]+\/)?image\/upload\/)(.*)$/i;

export function cloudinaryUrlFromMetadata(imageMetadata) {
  return imageMetadata?.[0].secure_url;
}

export function isCloudinaryUrl(url) {
  if (!url) return false;
  const match = url.match(cloudinaryUrlRegex);
  return match && match.length === 3;
}

function parseCloudinaryUrl(url) {
  let [_, baseUrl, assetName] = url.match(cloudinaryUrlRegex);
  baseUrl = baseUrl.replace(/^http:/, "https:");
  return { baseUrl, assetName };
}

function buildCloudinaryUrl(urlParts, transforms, flags) {
  let newUrl = urlParts.baseUrl;
  if (transforms) newUrl += transforms.join(",") + "/"
  if (flags) newUrl += flags.join(",") + "/"
  newUrl += urlParts.assetName;
  return newUrl;
}

const cl = {
  width: (value) => { return `w_${value}`},
  height: (value) => { return `h_${value}`}
}

export function makeSrcSet(imageUrl, {widths, transforms, flags, square}) {
  const urlParts = parseCloudinaryUrl(imageUrl);
  transforms ||= [];

  if (widths && widths.length) {
    const urls = widths.map(currWidth => {
      let currTransforms = transforms.concat(cl.width(currWidth));
      if (square) 
        currTransforms.push(cl.height(currWidth));
      return buildCloudinaryUrl(urlParts, currTransforms, flags) +  ` ${currWidth}w`;
    });
    return urls.join(", ");
  } else {
    return buildCloudinaryUrl(urlParts, transforms, flags);
  }
}

export function getLoadedResourceSize(url) {
  return window?.performance?.getEntriesByName(url)?.[0]?.encodedBodySize;
}
