import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import KeepAlive from '@/components/KeepAlive';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
