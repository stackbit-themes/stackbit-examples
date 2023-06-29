import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="text-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-200 via-fuchsia-100 to-white min-h-screen">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
