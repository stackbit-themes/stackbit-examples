import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { Box } from '@chakra-ui/react';

export const Footer = (props) => {
    const { copyrightText, 'data-sb-field-path': fieldPath } = props;
    return (
        <Box as="footer" py="16" color="gray.400" fontSize={{ base: 'xl', md: '2xl' }} lineHeight="tight" textAlign="center"  data-sb-field-path={fieldPath}>
            {copyrightText && (
                <Markdown className="markdown" data-sb-field-path=".copyrightText">
                    {copyrightText}
                </Markdown>
            )}
        </Box>
    );
};
