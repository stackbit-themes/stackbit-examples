import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import { Action } from './Action';

import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

export const HeroSection = (props) => {
    const { title, subtitle, backgroundImage, actions = [], 'data-sb-field-path': fieldPath } = props;
    return (
        <Box
            bgImage={backgroundImage?.url}
            {...(backgroundImage?.url && { bgSize: 'cover' })}
            {...(backgroundImage?.url && { bgPosition: 'center' })}
            borderRadius="md"
            data-sb-field-path={fieldPath}
        >
            <Flex
                direction="column"
                align="flex-start"
                justify="center"
                w="full"
                minH="60vh"
                px={{ base: 4, md: 8 }}
                bgGradient="linear(to-r, blackAlpha.600, transparent)"
                borderRadius="md"
            >
                <Stack direction="column" maxW="2xl" align="flex-start" spacing="6" pt="16" pb="32">
                    {title && (
                        <Heading as="h1" color="white" fontWeight="bold" lineHeight="none" fontSize={{ base: '5xl', md: '7xl' }} data-sb-field-path=".title">
                            {title}
                        </Heading>
                    )}
                    {subtitle && (
                        <Box color="white" fontSize={{ base: 'xl', md: '2xl' }} lineHeight="short">
                            <Markdown className="markdown" data-sb-field-path=".subtitle">
                                {subtitle}
                            </Markdown>
                        </Box>
                    )}
                    {actions.length > 0 && (
                        <Flex align="center" gap="4" wrap="wrap" data-sb-field-path=".actions">
                            {actions.map((action, index) => (
                                <Action key={index} {...action} data-sb-field-path={`.${index}`} />
                            ))}
                        </Flex>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
};
