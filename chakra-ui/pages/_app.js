import Head from 'next/head';
import theme from '../utils/theme';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
