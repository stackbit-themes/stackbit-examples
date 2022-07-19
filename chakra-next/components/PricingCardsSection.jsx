import * as React from 'react';

import { PricingCard } from './PricingCard';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export const PricingCardsSection = (props) => {
    const { title, subtitle, cards = [], 'data-sb-field-path': fieldPath } = props;
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
            {cards.length > 0 && (
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'center', md: 'stretch' }}
                    justify="center"
                    gap={{ base: 8, lg: 12 }}
                    mt={title || subtitle ? '10' : undefined}
                    data-sb-field-path=".cards"
                >
                    {cards.map((card, index) => (
                        <PricingCard key={index} {...card} data-sb-field-path={`.${index}`} />
                    ))}
                </Flex>
            )}
        </Box>
    );
};
