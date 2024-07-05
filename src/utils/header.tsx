import React from 'react';
import Link from 'next/link';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={styles.header}>
      <div className={styles.containerHeader}>
        <Link href="/" className={styles.logo}>
          Dream Interpreter
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}></Link>
          <button
            onClick={toggleDarkMode}
            className={styles.themeToggle}
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
