import "@/styles/style.scss";

import Head from "next/head";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NextNProgress from "nextjs-progressbar";
import localFont from "next/font/local";

const primaryFont = localFont({
  src: [
    {
      path: "../font/PingFang-Medium.ttf",
      style: "normal",
    },
  ],
  variable: "--font-pingfang",
});

const secondaryFont = localFont({
  src: [
    {
      path: "../font/AlimamaShuHeiTi-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-alimama",
});

const thirdFont = localFont({
  src: [
    {
      path: "../font/Mont-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-mont-bold",
});

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${primaryFont.variable} ${secondaryFont.variable} ${thirdFont.variable}`}
    >
      <Head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <LanguageProvider>
        <NextNProgress color="#ffffff" options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </LanguageProvider>
    </main>
  );
}
