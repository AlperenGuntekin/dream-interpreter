import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const theme = darkMode ? 'dark' : 'light';

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.containerFooter}>
        <div className={styles.content}>
          <div className={styles.logo}>Dream Interpreter</div>
          <nav className={styles.nav}>
            <Link href="/" className={`${styles.navLink} ${styles[theme]}`}>
              Home
            </Link>
            <Link
              href="/privacy"
              className={`${styles.navLink} ${styles[theme]}`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`${styles.navLink} ${styles[theme]}`}
            >
              Terms of Service
            </Link>
          </nav>
        </div>
        <div className={`${styles.copyright} ${styles[theme]}`}>
          © {new Date().getFullYear()} Dream Interpreter. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
