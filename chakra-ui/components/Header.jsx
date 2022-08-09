import * as React from 'react';
import NextLink from 'next/link';

import { Action } from './Action';

import { Link, Flex, Text } from '@chakra-ui/react';

export const Header = (props) => {
    const { title, navLinks = [], 'data-sb-field-path': fieldPath } = props;
    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" py={{ base: '4', lg: '6' }} data-sb-field-path={fieldPath}>
            {title && (
                <NextLink href="/" passHref>
                    <Link my="2" mr="6">
                        <Text as="span" fontWeight={700} fontSize={{ base: '2xl', lg: '3xl' }} lineHeight="none" data-sb-field-path=".title">
                            {title}
                        </Text>
                    </Link>
                </NextLink>
            )}
            {(navLinks ?? []).length > 0 && (
                <Flex align="center" wrap="wrap" columnGap={{ base: '4', lg: '6' }} rowGap="2" my="2" data-sb-field-path=".navLinks">
                    {navLinks.map((navLink, index) => (
                        <Action key={index} {...navLink} data-sb-field-path={`.${index}`} />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};
