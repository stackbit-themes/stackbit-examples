import * as React from "react";
import { toFieldPath, toObjectId } from '@stackbit/annotations';
import Markdown from "markdown-to-jsx";
import styles from "./index.module.css";

export const Footer = ({ siteConfig }) => {
  return (
    <footer className={styles.footer} {...toObjectId(siteConfig.__metadata.id)}>
      <div className={styles.content}>
          <Markdown {...toFieldPath('.footerText')}>{siteConfig.footerText}</Markdown>
      </div>
    </footer>
  );
};
