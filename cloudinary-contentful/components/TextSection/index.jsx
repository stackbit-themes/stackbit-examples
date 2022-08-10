import * as React from "react";
import { toFieldPath, pickDataAttrs } from "@stackbit/annotations";
import Markdown from "markdown-to-jsx";
import styles from "./index.module.css";

export const TextSection = (props) => {
  const { title, body } = props;
  return (
    <div className={styles.section} {...pickDataAttrs(props)}>
      {title && (
        <h2 className={styles.title} {...toFieldPath(".title")}>
          {title}
        </h2>
      )}
      {body && (
        <Markdown className={styles.body} {...toFieldPath(".body")}>
          {body}
        </Markdown>
      )}
    </div>
  );
};
