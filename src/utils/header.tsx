import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import styles from '../styles/Header.module.css';
import DreamLogo from '../../public/dreamlogo.png';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const theme = darkMode ? 'dark' : 'light';

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.containerHeader}>
        <Link href="/" className={styles.logo}>
          <Image
            src={DreamLogo}
            alt="Dream Interpretation Logo"
            width={40}
            height={40}
            className="me-2 mt-1"
          />
          Dream Interpretation
        </Link>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${styles[theme]}`}
          ></Link>
          <button
            onClick={toggleDarkMode}
            className={`${styles.themeToggle} ${styles[theme]}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <WbSunnyIcon style={{ fontSize: 24 }} />
            ) : (
              <NightlightRoundIcon style={{ fontSize: 24 }} />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
