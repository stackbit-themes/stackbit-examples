import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { Box, Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';

export const Testimonial = (props) => {
    const { quote, name, title, image, 'data-sb-field-path': fieldPath } = props;
    const bgColor = useColorModeValue('white', 'gray.700');
    return (
        <Box as="blockquote" maxW="2xl" mx="auto" data-sb-field-path={fieldPath}>
            <Box borderRadius="md" bg={bgColor} px="6" py="8" fontSize={{ base: 'md', md: 'lg' }} fontWeight="600" pos="relative">
                <QuoteIcon color="blue.400" boxSize={{ base: 8, lg: 10 }} mb="4" />
                <Markdown className="markdown" data-sb-field-path=".quote">
                    {quote}
                </Markdown>
                <TriangleIcon pos="absolute" top="100%" left="8" boxSize="10" color={bgColor} />
            </Box>
            {(name || title || image?.url) && (
                <Flex as="footer" align="center" fontSize="sm" lineHeight="base" mt="8">
                    {image?.url && (
                        <Box border="4px" borderColor={bgColor} borderRadius="full" flexShrink="0" mx="4">
                            <Image borderRadius="full" boxSize="64px" objectFit="cover" src={image.url} alt={image.altText} data-sb-field-path=".image" />
                        </Box>
                    )}
                    {(name || title) && (
                        <Box>
                            {name && (
                                <Text fontWeight={600} data-sb-field-path=".name">
                                    {name}
                                </Text>
                            )}
                            {title && <Text data-sb-field-path=".title">{title}</Text>}
                        </Box>
                    )}
                </Flex>
            )}
        </Box>
    );
};

const QuoteIcon = (props) => (
    <Icon viewBox="0 0 32 32" {...props}>
        <path
            fill="currentColor"
            d="M32 28v-12h-8c0-4.41 3.586-8 8-8v-4c-6.617 0-12 5.383-12 12v12h12zM12 28v-12h-8c0-4.41 3.586-8 8-8v-4c-6.617 0-12 5.383-12 12v12h12z"
        ></path>
    </Icon>
);

const TriangleIcon = (props) => (
    <Icon viewBox="0 0 32 32" {...props}>
        <path fill="currentColor" d="M0.32 0h31.36l-15.68 15.68z"></path>
    </Icon>
);
