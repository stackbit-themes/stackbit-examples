/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import {
  isCloudinaryUrl,
  makeSrcSet,
  getLoadedResourceSize,
} from "../../utils/image-utils";
import { pickDataAttrs } from "@stackbit/annotations";
import { imageRelativeSizes, imageStops } from "./consts";
import Markdown from "markdown-to-jsx";
import styles from "./index.module.css";

export function ImageCard(props) {
  const {
    imageUrl,
    alt,
    attribution,
    resizeMethod,
    imageFormat,
    originalSizeBytes,
  } = props;
  const sbDataAttributes = pickDataAttrs(props);
  const validImageUrl = isCloudinaryUrl(imageUrl);
  const widths = imageStops(resizeMethod);

  const imageRef = React.useRef(null);
  const [sizeBytes, setSizeBytes] = React.useState(null);

  function updateActualImageData() {
    const actualImageUrl = imageRef.current?.currentSrc;
    const imageLoadCompleted = imageRef.current?.complete;

    if (imageLoadCompleted) {
      const size = getLoadedResourceSize(actualImageUrl);
      setSizeBytes(size);
    } else {
      setSizeBytes(null);
    }
  }

  // This only fires if the content is modified _while_ the page is already displayed.
  // When a page is served from the server (static or SSR), the image is already loaded before
  // the element's event listeners are attached, hence onLoad() doesn't fire, and we rely on useEffect().
  function onImageLoaded() {
    updateActualImageData();
  }

  React.useEffect(updateActualImageData, [imageUrl]);

  if (imageUrl) {
    if (validImageUrl) {
      const flags = imageFormat === "auto" ? ["f_auto"] : null;
      const srcSet = makeSrcSet(imageUrl, { widths, flags });
      const pctOfOriginalSize =
        sizeBytes && originalSizeBytes
          ? Math.round((sizeBytes / originalSizeBytes) * 100 * 10) / 10
          : null;

      return (
        <div {...sbDataAttributes}>
          <img
            ref={imageRef}
            className={styles.image}
            src={srcSet[0]}
            alt={alt}
            srcSet={srcSet}
            sizes={imageRelativeSizes}
            onLoad={onImageLoaded}
          />
          {sizeBytes && (
            <div className={styles.imageInfoOverlay}>
              {Math.ceil(sizeBytes / 1024)}kb
              {pctOfOriginalSize && <span>{` (${pctOfOriginalSize}% of original)`}</span>}
            </div>
          )}
          {attribution && (
            <Markdown className={styles.attribution}>{attribution}</Markdown>
          )}
        </div>
      );
    } else {
      return (
        <NoImage
          message="Not a Cloudinary image"
          sbDataAttributes={sbDataAttributes}
        />
      );
    }
  } else {
    return (
      <NoImage
        message="Please select image"
        sbDataAttributes={sbDataAttributes}
      />
    );
  }
}

function NoImage({ message, sbDataAttributes }) {
  return (
    <div className={styles.noImage} {...sbDataAttributes}>
      {message}
    </div>
  );
}
