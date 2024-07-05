import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../utils/header';
import Footer from '../utils/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
