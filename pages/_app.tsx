/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { wrapper } from '@/redux/store';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
