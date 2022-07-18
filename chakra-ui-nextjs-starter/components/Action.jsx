import * as React from 'react';
import NextLink from 'next/link';

import { Button, Link, Text } from '@chakra-ui/react';

export const Action = (props) => {
    const { type, label, url, colorScheme = 'blue', 'data-sb-field-path': fieldPath } = props;
    return type === 'Button' ? (
        <NextLink href={url} passHref>
            <Button as="a" colorScheme={colorScheme} rounded="full" variant="solid" data-sb-field-path={fieldPath}>
                <Text as="span" data-sb-field-path=".label">
                    {label}
                </Text>
            </Button>
        </NextLink>
    ) : (
        <NextLink href={url} passHref>
            <Link data-sb-field-path={fieldPath}>
                <Text as="span" data-sb-field-path=".label">
                    {label}
                </Text>
            </Link>
        </NextLink>
    );
};
