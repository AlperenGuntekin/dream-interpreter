import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Header from '@/src/utils/header';
import Footer from '@/src/utils/footer';
import '../styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    adsbygoogle: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'G-4N47E5SB99', {
          page_path: url,
        });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <>
      <Head>
        <title>Dream Interpretation</title>
        <meta
          name="description"
          content="Explore the meanings behind your dreams with Dream Interpreter. Our advanced AI analyzes and interprets your dreams, providing insights into your subconscious mind. Find detailed dream explanations, share your experiences, and get personalized interpretations. Discover the secrets of your dreams today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NMTNBVH54D"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-NMTNBVH54D');
        `}
      </Script>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Component
        {...pageProps}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Footer darkMode={darkMode} />
    </>
  );
}

export default MyApp;
