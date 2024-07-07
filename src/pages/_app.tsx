import '../styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/src/utils/header';
import Footer from '@/src/utils/footer';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

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
