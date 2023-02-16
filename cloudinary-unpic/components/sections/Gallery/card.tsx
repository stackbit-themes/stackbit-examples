/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Image } from "@unpic/react";
import Markdown from "markdown-to-jsx";
import { pickDataAttrs } from "@stackbit/annotations";
import { getLoadedResourceSize } from "utils/browser";

const widths = [400, 600, 800, 1000];

export interface ImageMetadata {
  url?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

type ImageCardProps = {
  imageData?: ImageMetadata;
  alt?: string;
  attribution?: string;
  sizesHint?: string;
  priority?: boolean;
  shouldOptimize: boolean;
  shouldSetWidths: boolean;
};

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const sbDataAttributes = pickDataAttrs(props);
  const {
    imageData,
    alt,
    attribution,
    sizesHint,
    priority,
    shouldOptimize = true,
    shouldSetWidths = true,
  } = props;
  const [loadedBytes, setLoadedBytes] = React.useState<number>();
  const imageRef = React.useRef<HTMLImageElement>(null);

  function updateLoadedImageSize() {
    if (imageRef.current?.complete) {
      const size = getLoadedResourceSize(imageRef.current?.currentSrc);
      setLoadedBytes(size);
    } else {
      setLoadedBytes(undefined);
    }
  }

  // onLoad() doesn't fire for server-rendered pages (static or SSR), as the image is loaded
  // before event listeners are attached. Hence the useEffect().
  function onImageLoaded() {
    updateLoadedImageSize();
  }
  React.useEffect(updateLoadedImageSize, [imageData]);

  if (imageData?.url) {
    const pctOfOriginalSize =
      loadedBytes && imageData.bytes
        ? Math.round((loadedBytes / imageData.bytes) * 100 * 10) / 10
        : null;
    const aspectRatio =
      imageData.width && imageData.height
        ? imageData.width / imageData.height
        : undefined;

    return (
      <div
        className="card rounded-md shadow-xl relative overflow-hidden"
        {...sbDataAttributes}
      >
        {shouldOptimize ? (
          <Image
            ref={imageRef}
            src={imageData.url}
            layout="fullWidth"
            alt={alt}
            onLoad={onImageLoaded}
            priority={priority}
            sizes={sizesHint}
            breakpoints={shouldSetWidths ? widths : []}
            aspectRatio={aspectRatio}
          />
        ) : (
          <img
            ref={imageRef}
            src={imageData.url}
            className="w-full object-cover"
            alt={alt}
            onLoad={onImageLoaded}
            style={{ aspectRatio }}
          />
        )}
        {loadedBytes && (
          <div className="absolute top-3 left-3 text-neutral-content text-sm md:text-lg font-semibold info-text-shadow">
            {Math.ceil(loadedBytes / 1024)}kb
            {pctOfOriginalSize && (
              <span>{` (${pctOfOriginalSize}% of original)`}</span>
            )}
          </div>
        )}
        {attribution && (
          <Markdown className="py-2 px-3 text-xs">{attribution}</Markdown>
        )}
      </div>
    );
  } else {
    return (
      <div
        className="card prose rounded-md shadow-xl text-xl flex h-60 p-6 w-full justify-center items-center text-center bg-base-300"
        {...sbDataAttributes}
      >
        Select an image for this card with Stackbit
      </div>
    );
  }
};
/*
.noImage {
  background-color: beige;
  padding: 60px 10px;
  font-size: 18px;
  text-align: center;
}
*/
export default ImageCard;
