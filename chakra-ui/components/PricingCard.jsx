import * as React from 'react';

import { Action } from './Action';

import { Box, Flex, Heading, List, ListItem, Text, useColorModeValue, VStack } from '@chakra-ui/react';

export const PricingCard = (props) => {
    const { title, subtitle, price, description, features = [], actions = [], 'data-sb-field-path': fieldPath } = props;
    const bgColor = useColorModeValue('white', 'gray.700');
    return (
        <Box flex="1 1 0%" maxW="md" w="100%" borderRadius="md" bg={bgColor} px="6" py={{ base: 8, md: 10 }} data-sb-field-path={fieldPath}>
            <VStack align="flex-start" spacing={6} maxW="xs" mx="auto">
                {title && (
                    <Heading
                        as="h3"
                        _after={{
                            bg: 'blue.400',
                            content: `""`,
                            display: 'block',
                            height: '3px',
                            mt: 2,
                            width: '80px'
                        }}
                        data-sb-field-path=".title"
                    >
                        {title}
                    </Heading>
                )}
                {subtitle && <Text color="gray.400" data-sb-field-path=".subtitle">{subtitle}</Text>}
                {price && (
                    <Text fontSize={{ base: '5xl', md: '7xl' }} fontWeight="bold" lineHeight="none" data-sb-field-path=".price">
                        {price}
                    </Text>
                )}
                {description && <Text fontWeight="bold" data-sb-field-path=".description">{description}</Text>}
                {actions.length > 0 && (
                    <Flex align="center" gap="4" wrap="wrap" data-sb-field-path=".actions">
                        {actions.map((action, index) => (
                            <Action key={index} {...action} data-sb-field-path={`.${index}`} />
                        ))}
                    </Flex>
                )}
                {features.length > 0 && (
                    <List spacing="2" data-sb-field-path=".features">
                        {features.map((feature, index) => (
                            <ListItem key={index} data-sb-field-path={`.${index}`}>
                                {feature}
                            </ListItem>
                        ))}
                    </List>
                )}
            </VStack>
        </Box>
    );
};
