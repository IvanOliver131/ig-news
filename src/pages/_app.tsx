import { AppProps } from 'next/app'

// Typar as propriedades
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
