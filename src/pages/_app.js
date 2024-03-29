import "@/styles/style.scss";
import "react-medium-image-zoom/dist/styles.css";
import "react-notifications-component/dist/theme.css";

import Head from "next/head";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NextNProgress from "nextjs-progressbar";
import localFont from "next/font/local";
import { ReactNotifications } from "react-notifications-component";

const primaryFont = localFont({
  src: [
    {
      path: "../font/PingFang-SC-Regular.ttf",
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

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${primaryFont.variable} ${secondaryFont.variable}`}
    >
      <Head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <LanguageProvider>
        <NextNProgress color="#DE3D30" options={{ showSpinner: false }} />
        <ReactNotifications />
        <Component {...pageProps} />
      </LanguageProvider>
    </main>
  );
}
