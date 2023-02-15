import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="dark:bg-slate-800 dark:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
