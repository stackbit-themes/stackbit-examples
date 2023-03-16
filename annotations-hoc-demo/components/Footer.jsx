import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { annotations, toFieldPath } from '../utils/annotations.js';

export const Footer = ({ siteConfig }) => {
    const { footer } = siteConfig;
    return (
        <footer className="footer outer" {...annotations(siteConfig)}>
            <div className="footer-container inner" {...toFieldPath('footer')}>
                <Markdown className="footer-content" {...toFieldPath('body', footer)}>
                    {siteConfig.footer.body}
                </Markdown>
            </div>
        </footer>
    );
};
