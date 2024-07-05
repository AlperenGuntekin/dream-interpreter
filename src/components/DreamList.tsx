import React, { useState } from 'react';
import Link from 'next/link';
import { Dream } from '../interfaces/dream';
import dreams from '../data/dreams.json';
import styles from '../styles/DreamList.module.css';

interface DreamListProps {
  darkMode: boolean;
}

const DreamList: React.FC<DreamListProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredDreams = dreams.filter((dream: Dream) =>
    dream.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = darkMode ? 'dark' : 'light';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dream Journal</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search dreams..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className={`${styles.searchInput} ${styles[theme]}`}
        />
      </div>
      <ul className={styles.dreamList}>
        {filteredDreams.map((dream: Dream) => (
          <li
            key={dream.slug}
            className={`${styles.dreamItem} ${styles[theme]}`}
          >
            <Link
              href={`/dreams/${dream.slug}`}
              className={`${styles.dreamLink} ${styles[theme]}`}
            >
              <h3 className={`${styles.dreamTitle} ${styles[theme]}`}>
                {dream.title}
              </h3>
              <p className={`${styles.dreamDescription} ${styles[theme]}`}>
                {dream.description.slice(0, 100)}...
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DreamList;
