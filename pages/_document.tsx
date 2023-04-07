import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Thomas Mastromonaco Photography Portfolio"
          />
          <meta property="og:site_name" content="mastro-photo.vercel.app" />
          <meta
            property="og:description"
            content="Thomas Mastromonaco Photography Portfolio"
          />
          <meta property="og:title" content="Thomas Mastromonaco Photography Portfolio" />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
