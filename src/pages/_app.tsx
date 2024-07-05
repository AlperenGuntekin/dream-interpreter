import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '../utils/header';
import Footer from '../utils/footer';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'night-theme' : 'day-theme'}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Component {...pageProps} darkMode={darkMode} />
      <Footer />
    </div>
  );
}

export default MyApp;
