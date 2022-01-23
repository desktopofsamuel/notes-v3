import Document, { Html, Head, Main, NextScript } from "next/document";
import { LOCALE } from "../config";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={LOCALE}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans+HK:wght@400;700&family=Space+Mono&display=swap"
            rel="stylesheet"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="/rss.xml"
            title="Main RSS Feed"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
