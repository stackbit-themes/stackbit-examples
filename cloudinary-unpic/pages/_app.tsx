import { AppProps } from "next/app";
import Head from "next/head";
import localFont from "@next/font/local";
import "styles/globals.css";

const interRomanFont = localFont({
  src: "../styles/Inter-roman.var.woff2",
  variable: "--font-inter-roman",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main
        className={`${interRomanFont.variable} font-sans w-full overflow-hidden`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
