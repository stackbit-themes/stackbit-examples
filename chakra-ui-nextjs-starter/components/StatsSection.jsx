import * as React from 'react';

import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';

export const StatsSection = (props) => {
    const { title, subtitle, items = [], 'data-sb-field-path': fieldPath } = props;
    return (
        <Box py={{ base: 8, md: 12 }} data-sb-field-path={fieldPath}>
            {title && (
                <Heading as="h2" fontWeight="bold" lineHeight="none" fontSize={{ base: '3xl', md: '5xl' }} textAlign="center" data-sb-field-path=".title">
                    {title}
                </Heading>
            )}
            {subtitle && (
                <Text
                    color="gray.400"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    lineHeight="short"
                    textAlign="center"
                    mt={title ? '2' : undefined}
                    data-sb-field-path=".subtitle"
                >
                    {subtitle}
                </Text>
            )}
            {items.length > 0 && (
                <Flex
                    align="flex-start"
                    justify="center"
                    wrap="wrap"
                    gap={{ base: 8, lg: 14 }}
                    mt={title || subtitle ? '10' : undefined}
                    data-sb-field-path=".items"
                >
                    {items.map((item, index) => (
                        <VStack spacing="4" maxW="180" textAlign="center" key={index} data-sb-field-path={`.${index}`}>
                            {item.amount && (
                                <Box
                                    color="blue.400"
                                    fontWeight="bold"
                                    lineHeight="none"
                                    fontSize={{ base: '5xl', md: '7xl' }}
                                    _after={{
                                        bg: 'blue.400',
                                        content: `""`,
                                        display: 'block',
                                        height: '3px',
                                        mx: 'auto',
                                        mt: 3,
                                        width: '50%'
                                    }}
                                    data-sb-field-path=".amount"
                                >
                                    {item.amount}
                                </Box>
                            )}
                            {item.description && (
                                <Text
                                    color="gray.400"
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    fontWeight="normal"
                                    lineHeight="base"
                                    data-sb-field-path=".description"
                                >
                                    {item.description}
                                </Text>
                            )}
                        </VStack>
                    ))}
                </Flex>
            )}
        </Box>
    );
};
