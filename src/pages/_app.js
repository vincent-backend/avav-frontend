import '@/styles/style.scss'
import NextNProgress from 'nextjs-progressbar'
import localFont from 'next/font/local'

const primaryFont = localFont({
  src: [
    {
      path: "../font/PingFang-Medium.ttf",
      style: "normal",
    }
  ],
  variable: "--font-pingfang",
});

const secondaryFont = localFont({
  src: [
    {
      path: "../font/AlimamaShuHeiTi-Bold.ttf",
      weight: "700",
      style: "bold",
    }
  ],
  variable: "--font-alimama",
});

const thirdFont = localFont({
  src: [
    {
      path: "../font/Mont-Bold.otf",
      weight: "700",
      style: "bold",
    }
  ],
  variable: "--font-mont-bold",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${primaryFont.variable} ${secondaryFont.variable} ${thirdFont.variable}`}>
      <NextNProgress color="#ffffff" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </main>
  ); 
}
