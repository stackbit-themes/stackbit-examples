import * as React from "react";
import { pickDataAttrs } from "@stackbit/annotations";
import Markdown from "markdown-to-jsx";
import styles from "./index.module.css";
import { Content, TextSection } from "utils/types";

type TextSectionProps = Content;

const TextSection: React.FC<TextSectionProps> = (props) => {
  const { title, body } = props as TextSection;
  return (
    <div
      className="w-full flex justify-center pt-8 pb-4"
      {...pickDataAttrs(props)}
    >
      <div className="prose max-w-3xl">
        {title && (
          <h2 className="text-center" data-sb-field-path=".title">
            {title}
          </h2>
        )}
        {body && <Markdown data-sb-field-path=".body">{body}</Markdown>}
      </div>
    </div>
  );
};

export default TextSection;
