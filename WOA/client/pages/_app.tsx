import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
