import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="Explore the meanings behind your dreams with Dream Interpreter. Our advanced AI analyzes and interprets your dreams, providing insights into your subconscious mind. Find detailed dream explanations, share your experiences, and get personalized interpretations. Discover the secrets of your dreams today!"
          />
          <meta
            name="keywords"
            content="dreams, interpretation, dream analysis"
          />
          <meta name="author" content="Alperen Guntekin" />
          <meta property="og:title" content="Dream Interpretation" />
          <meta
            property="og:description"
            content="Explore the meanings behind your dreams with Dream Interpreter. Our advanced AI analyzes and interprets your dreams, providing insights into your subconscious mind."
          />
          <meta property="og:url" content="https://interpretationdream.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/dreamlogo.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Dream Interpretation" />
          <meta
            name="twitter:description"
            content="Explore the meanings behind your dreams with Dream Interpreter. Our advanced AI analyzes and interprets your dreams, providing insights into your subconscious mind."
          />
          <meta name="twitter:image" content="/dreamlogo.png" />
          <link rel="icon" href="/dreamlogo.png" />
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
