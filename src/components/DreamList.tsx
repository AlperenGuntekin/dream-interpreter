import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Dream } from '../interfaces/dream';
import dreamsData from '../data/dreams.json';
import styles from '../styles/DreamList.module.css';

interface DreamListProps {
  darkMode: boolean;
}

const DreamList: React.FC<DreamListProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentDreams, setRecentDreams] = useState<Dream[]>([]);
  const [allDreams, setAllDreams] = useState<Dream[]>([]);

  useEffect(() => {
    const dreams: Dream[] = dreamsData as Dream[];
    setRecentDreams(dreams.slice(-10).reverse());
    setAllDreams(dreams);
  }, []);

  const filteredDreams = useMemo(() => {
    if (!searchTerm) return recentDreams;
    return allDreams.filter((dream: Dream) =>
      dream.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recentDreams, allDreams]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
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
          onChange={handleSearchChange}
          className={`${styles.searchInput} ${styles[theme]}`}
        />
      </div>
      <ul className={styles.dreamList}>
        {filteredDreams.map((dream: Dream, index: number) => (
          <li
            key={`${dream.slug}-${index}`}
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
