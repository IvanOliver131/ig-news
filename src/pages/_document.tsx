import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document{
  render() {
    return (
      <Html>
      <Head>
        {/* Renderiza a conexão das fontes / tirei o crossorigin que vinha*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
        
        <title>ig.news</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </Html>
    );
  }
}