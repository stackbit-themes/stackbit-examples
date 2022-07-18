import * as React from 'react';

import { Testimonial } from './Testimonial';

import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

export const TestimonialsSection = (props) => {
    const { title, subtitle, testimonials = [], 'data-sb-field-path': fieldPath } = props;
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
            {testimonials.length > 0 && (
                <SimpleGrid
                    {...(testimonials.length > 1 && { columns: { md: 2 } })}
                    spacing={{ base: 8, lg: 12 }}
                    mt={title || subtitle ? '10' : undefined}
                    data-sb-field-path=".testimonials"
                >
                    {testimonials.map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} data-sb-field-path={`.${index}`} />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};
