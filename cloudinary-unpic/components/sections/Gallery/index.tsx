import * as React from "react";
import Masonry from "react-masonry-css";
import { pickDataAttrs } from "@stackbit/annotations";
import ImageCardComponent, { ImageMetadata } from "./card";
import {
  CloudinaryImageMetadata,
  Content,
  GallerySection,
  ImageCard,
} from "utils/types";

const singleColumnBreakpoint = 450; // Show a single column till this px width
const multiColumnCount = 3;
const sizesHint = `(max-width: ${singleColumnBreakpoint}px) 100vw, ${Math.ceil(
  100 / multiColumnCount
)}vw`;
const priorityRows = 1;

type GallerySectionProps = Content;

const GallerySection: React.FC<GallerySectionProps> = (props) => {
  const { title, cards } = props as GallerySection;
  return (
    <div className="py-10" {...pickDataAttrs(props)}>
      {title && (
        <div
          className="prose text-center flex justify-center w-full max-w-none pb-8"
          data-sb-field-path=".title"
        >
          <h2>{title}</h2>
        </div>
      )}
      {cards?.length ? (
        <Cards cards={cards} />
      ) : (
        <h3 data-sb-field-path=".cards">Add the first image</h3>
      )}
    </div>
  );
};

export default GallerySection;

const Cards: React.FC<{ cards: ImageCard[] }> = ({ cards }) => {
  return (
    <Masonry
      breakpointCols={{
        default: multiColumnCount,
        [singleColumnBreakpoint]: 1,
      }}
      className="flex ml-[-2%]"
      columnClassName="flex flex-col gap-6 pl-[2%]"
      data-sb-field-path=".cards"
    >
      {cards.map((card, idx) => {
        const imageData = getImageData(card.image);
        return (
          <ImageCardComponent
            imageData={imageData}
            alt={card.alt}
            sizesHint={sizesHint}
            attribution={card.attribution}
            priority={idx < multiColumnCount * priorityRows}
            data-sb-field-path={`.${idx}`}
            key={`${idx}-${imageData?.url}`}
          />
        );
      })}
    </Masonry>
  );
};

function getImageData(
  rawImage: string | CloudinaryImageMetadata | undefined
): ImageMetadata | undefined {
  if (rawImage) {
    if (typeof rawImage === "string") {
      return { url: rawImage };
    } else {
      if (rawImage.secure_url) {
        return {
          url: rawImage.secure_url,
          width: rawImage.width,
          height: rawImage.height,
          bytes: rawImage.bytes,
        };
      } else {
        throw new Error(`Unknown source image: ${rawImage}`);
      }
    }
  }
}
