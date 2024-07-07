import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/src/utils/header';
import Footer from '@/src/utils/footer';
import '../styles/globals.css';

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
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-4N47E5SB99`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4N47E5SB99', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5633161613176687`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </Head>
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
