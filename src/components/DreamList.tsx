import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dream } from '../interfaces/dream';
import dreamsData from '../data/dreams.json';
import styles from '../styles/DreamList.module.css';

interface DreamListProps {
  darkMode: boolean;
}

const DreamList: React.FC<DreamListProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [randomDreams, setRandomDreams] = useState<Dream[]>([]);

  useEffect(() => {
    const dreams: Dream[] = dreamsData as Dream[];
    const shuffledDreams = dreams.sort(() => 0.5 - Math.random());
    setRandomDreams(shuffledDreams.slice(0, 10));
  }, []);

  const filteredDreams = randomDreams.filter((dream: Dream) =>
    dream.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = darkMode ? 'dark' : 'light';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dream Journal</h1>
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
