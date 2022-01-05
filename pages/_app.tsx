import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme.js";
import { DefaultSeo } from "next-seo";
import SEO from "../seo-config";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={true} theme={customTheme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
