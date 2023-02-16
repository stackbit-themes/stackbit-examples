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
  const [shouldOptimize, setShouldOptimize] = React.useState(true);
  const [shouldSetWidths, setShouldSetWidths] = React.useState(true);

  return (
    <div className="py-8" {...pickDataAttrs(props)}>
      <div className="prose flex justify-center max-w-none pb-8">
        <div className="flex flex-col gap-1">
          {title && (
            <h2 className="m-0 mb-1" data-sb-field-path=".title">
              {title}
            </h2>
          )}
          <div className="flex gap-4 justify-center">
            <CheckboxControl
              label="Optimize"
              checked={shouldOptimize}
              setChecked={setShouldOptimize}
            />
            <CheckboxControl
              label="Multi-width"
              disabled={!shouldOptimize}
              checked={shouldOptimize && shouldSetWidths}
              setChecked={setShouldSetWidths}
            />
          </div>
        </div>
      </div>

      {cards?.length ? (
        <Cards
          cards={cards}
          shouldOptimize={shouldOptimize}
          shouldSetWidths={shouldSetWidths}
        />
      ) : (
        <h3 data-sb-field-path=".cards">Add the first image</h3>
      )}
    </div>
  );
};

export default GallerySection;

const CheckboxControl: React.FC<{
  label: string;
  disabled?: boolean;
  checked: boolean;
  setChecked: (value: boolean) => void;
}> = ({ label, disabled = false, checked, setChecked }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer flex gap-1 pl-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="checkbox"
          onChange={() => {
            setChecked(!checked);
          }}
        />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

const Cards: React.FC<{
  cards: ImageCard[];
  shouldOptimize: boolean;
  shouldSetWidths: boolean;
}> = ({ cards, shouldOptimize, shouldSetWidths }) => {
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
            shouldOptimize={shouldOptimize}
            shouldSetWidths={shouldSetWidths}
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
