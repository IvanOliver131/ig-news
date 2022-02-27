import { AppProps } from 'next/app'

import '../../styles/global.scss';

// Typar as propriedades
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
