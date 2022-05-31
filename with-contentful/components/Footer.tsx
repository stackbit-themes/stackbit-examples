import * as React from 'react';
import { toFieldPath, toObjectId } from '@stackbit/annotations';
import Markdown from 'markdown-to-jsx';
import { IFooterConfig } from '../types/sourcebit';
import { ISiteConfig } from 'types/sourcebit';

export const Footer = (site: ISiteConfig) => {
    return (
        <footer className="footer outer" {...toObjectId(site.footer.__metadata.id)}>
            <div className="footer-container inner">
                <Markdown className="footer-content" {...toFieldPath('body')}>
                    {site.footer.body}
                </Markdown>
            </div>
        </footer>
    );
};
