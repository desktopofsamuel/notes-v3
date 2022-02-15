import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme.js";
import { DefaultSeo } from "next-seo";
import SEO from "../seo-config";
import type { AppProps } from "next/app";
import "@fontsource/inter/variable.css";
import "@fontsource/noto-sans-hk/400.css";
import "@fontsource/noto-sans-hk/700.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as ga from "../lib/google-analytics";
import "@/styles/prism-theme.css";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
      `}
      </Script>
      <Head>
        <link rel="icon" href="/icons/favicon.svg" />
        <link rel="mask-icon" href="mask-icon.svg" color="#0077CC" />
        <link rel="apple-touch-icon" href="/icons/favicon.png" />
      </Head>
      <NextNProgress height={4} color="#FAA91A" />
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
