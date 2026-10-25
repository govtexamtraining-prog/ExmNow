import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#006ac9" />
      </Head>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
