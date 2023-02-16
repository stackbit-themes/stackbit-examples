import React from "react";
import { Content } from "utils/types";
import GallerySection from "./sections/Gallery";
import TextSection from "./sections/Text";

export const componentByContentType: Record<string, React.FC<Content>> = {
  GallerySection: GallerySection,
  TextSection: TextSection,
};
