import * as React from 'react';

import { Box, Flex, Heading, Image } from '@chakra-ui/react';

export const LogoStripSection = (props) => {
    const { title, logos = [], 'data-sb-field-path': fieldPath } = props;
    return (
        <Box py={{ base: 8, md: 12 }} data-sb-field-path={fieldPath}>
            {title && (
                <Heading as="h2" fontWeight="normal" lineHeight="none" fontSize="lg" textAlign="center" data-sb-field-path=".title">
                    {title}
                </Heading>
            )}
            {logos.length > 0 && (
                <Flex align="center" justify="center" wrap="wrap" gap={{ base: 6, lg: 12 }} mt={title ? 8 : undefined} data-sb-field-path=".logos">
                    {logos.map((logo, index) => (
                        <Image key={index} src={logo.url} alt={logo.altText} maxW="160" data-sb-field-path={`.${index}`} />
                    ))}
                </Flex>
            )}
        </Box>
    );
};
