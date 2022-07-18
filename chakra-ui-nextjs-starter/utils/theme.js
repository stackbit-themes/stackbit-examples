import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
    config: {
        useSystemColorMode: true
    },
    styles: {
        global: (props) => ({
            body: {
                background: mode('gray.50', 'gray.800')(props),
                color: mode('gray.800', 'gray.50')(props),
                lineHeight: 'tall'
            },
            '.markdown': {
                a: {
                    textDecoration: 'underline',
                    '&:hover': {
                        textDecoration: 'none'
                    }
                },
                p: {
                    fontSize: 'sm',
                    lineHeight: '1.4'
                }
            }
        })
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal'
            },
            sizes: {
                md: {
                    px: '24px'
                }
            }
        }
    }
});

export default theme;
