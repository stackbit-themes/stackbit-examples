import * as React from 'react';
import * as types from 'contentlayer/generated';

export const Footer: React.FC<{ siteConfig: types.SiteConfig }> = ({
  siteConfig,
}) => {
  return (
    <footer
      className="footer outer"
      data-sb-field-path={`${siteConfig.stackbitObjectId}:footer`}
    >
      <div className="footer-container inner">
        <div
          dangerouslySetInnerHTML={{ __html: siteConfig.footer.body.html }}
          className="footer-content"
          data-sb-field-path=".body"
        />
      </div>
    </footer>
  );
};
