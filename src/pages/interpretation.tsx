import React from 'react';
import styles from '../styles/interpretation.module.css';
import { useRouter } from 'next/router';

const InterpretationPage = ({ darkMode }: { darkMode: boolean }) => {
  const router = useRouter();
  const { dream, interpretation } = router.query;

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div
        className={`${styles.content} ${darkMode ? styles.dark : styles.light}`}
      >
        <h1 className={styles.title}>Dream Interpretation</h1>
        <p
          className={`${styles.dream} ${darkMode ? styles.dark : styles.light}`}
        >
          {dream}
        </p>
        <div
          className={`${styles.interpretation} ${
            darkMode ? styles.dark : styles.light
          }`}
        >
          <h2 className={styles.interpretationTitle}>Interpretation</h2>
          <p className={styles.interpretationContent}>{interpretation}</p>
        </div>
        <a
          href="/"
          className={`${styles.backLink} ${
            darkMode ? styles.dark : styles.light
          }`}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default InterpretationPage;
