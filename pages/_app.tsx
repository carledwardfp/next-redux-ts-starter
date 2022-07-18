/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
