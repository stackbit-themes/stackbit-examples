/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { cloudinaryUrlFromMetadata, isCloudinaryUrl, makeSrcSet } from "../../utils/image-utils";
import { toFieldPath, pickDataAttrs } from "@stackbit/annotations";
import styles from "./index.module.css";

const thumbTypes = [
  { label: "Default fit", transforms: ["c_thumb"] },
  { label: "Automatic mode", transforms: ["c_thumb", "g_auto"] },
  { label: "Face or center", transforms: ["c_thumb", "g_face:center"] },
];

export function ThumbnailsSection(props) {
  const { title, image, altText } = props;
  const imageUrl = cloudinaryUrlFromMetadata(image);
  const validImageUrl = isCloudinaryUrl(imageUrl);

  return (
    <div className={styles.section} {...pickDataAttrs(props)}>
      <div className={styles.sectionInner}>
        {props.title && (
          <h2 className={styles.title} {...toFieldPath(".title")}>
            {title}
          </h2>
        )}
        {validImageUrl ? (
          <ImageAndThumbs imageUrl={imageUrl} altText={altText} />
        ) : (
          <h3 className={styles.noImage}>
            Please select image from Cloudinary.
          </h3>
        )}
      </div>
    </div>
  );
}

function ImageAndThumbs({ imageUrl, altText }) {
  return (
    <div className={styles.imagesWrapper}>
      <MainImage imageUrl={imageUrl} altText={altText} />

      <div className={styles.thumbsGrid}>
        {thumbTypes.map((thumbType, idx) => {
          return (
            <ThumbnailImage
              key={idx}
              imageUrl={imageUrl}
              thumbType={thumbType}
              altText={altText}
            />
          );
        })}
      </div>
    </div>
  );
}

const mainImageSizeStops = [400, 600, 800, 1000];
const mainImageSizesHint = "(max-width: 600px) 65vw, 450px";

function MainImage({ imageUrl, altText }) {
  const srcSet = makeSrcSet(imageUrl, { widths: mainImageSizeStops });
  return (
    <div className={styles.mainImageWrapper}>
      <img
        className={styles.mainImage}
        src={srcSet[0]}
        alt={altText}
        srcSet={srcSet}
        sizes={mainImageSizesHint}
        {...toFieldPath(".image")}
      />
    </div>
  );
}

const thumbnailSizeStops = [200, 400];
const thumbnailSizesHint = "(max-width: 600px) 35vw, 150px";

function ThumbnailImage({ imageUrl, thumbType, altText }) {
  const srcSet = makeSrcSet(imageUrl, {
    widths: thumbnailSizeStops,
    transforms: thumbType.transforms,
    square: true,
  });

  return (
    <div>
      <div className={styles.thumbLabel}>{thumbType.label}</div>
      <img
        className={styles.thumbImage}
        src={srcSet[0]}
        alt={altText}
        srcSet={srcSet}
        sizes={thumbnailSizesHint}
      />
    </div>
  );
}
