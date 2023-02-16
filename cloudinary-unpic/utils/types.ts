export interface Content {
  type: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

export interface Document extends Content {
  __id: string;
  __url?: string;
}

export interface SiteConfig extends Document {
  type: "SiteConfig";
  title?: string;
  footerText?: string;
}

export interface TextSection extends Content {
  type: "TextSection";
  title?: string;
  body?: string;
}

export interface CloudinaryImageMetadata {
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
}

export interface ImageCard extends Content {
  type: "ImageCard";
  image?: string | CloudinaryImageMetadata;
  alt?: string;
  attribution?: string;
}

export interface GallerySection extends Content {
  type: "GallerySection";
  title?: string;
  cards?: ImageCard[];
}

export type Section = TextSection | GallerySection;

export interface Page extends Document {
  title?: string;
  sections?: Section[];
  body?: string;
}
