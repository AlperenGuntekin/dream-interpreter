import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerFooter}>
        <div className={styles.content}>
          <div className={styles.logo}>Dream Interpreter</div>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
            <Link href="/privacy" className={styles.navLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.navLink}>
              Terms of Service
            </Link>
          </nav>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Dream Interpreter. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
