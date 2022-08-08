import * as React from "react";
import Masonry from "react-masonry-css";
import { toFieldPath, pickDataAttrs } from "@stackbit/annotations";
import { columnBreakpoints } from "./consts";
import styles from "./index.module.css";
import { ImageCard } from "./ImageCard";

export function GallerySection(props) {
  const {title, images} = props;
  const empty = !images?.length;
  return (
    <div {...pickDataAttrs(props)}>
      {title && (
        <div className={styles.title} {...toFieldPath(".title")}>
          <h2>{title}</h2>
          { empty && <h3>Please add the first image.</h3>}
        </div>
      )}
      { !empty && <Gallery {...props}/>}
    </div>
  );
}

function Gallery({images, resizeMethod, imageFormat}) {
  return <Masonry
    breakpointCols={columnBreakpoints}
    className={styles.grid}
    columnClassName={styles.gridColumn}
  >
    {images.map((imageInfo, idx) => {
      const { altText, attribution } = imageInfo;
      const imageMetadata = imageInfo?.image?.[0];
      const imageUrl = imageMetadata?.original_secure_url || imageMetadata?.secure_url;
      const originalSizeBytes = imageMetadata?.bytes;
      return (
        <ImageCard
          key={`${idx}:${imageUrl}`}
          imageUrl={imageUrl}
          originalSizeBytes={originalSizeBytes}
          alt={altText}
          attribution={attribution}
          resizeMethod={resizeMethod}
          imageFormat={imageFormat}
          {...toFieldPath(`.images.${idx}`)} />
      );
    })}
  </Masonry>;
}

