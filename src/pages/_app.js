import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }) {
  return (
    <main>
      <NextNProgress color="#ffffff" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </main>
  ); 
}
