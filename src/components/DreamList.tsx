import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Dream } from '../interfaces/dream';
import dreamsData from '../data/dreams.json';
import styles from '../styles/DreamList.module.css';
import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import parse from 'html-react-parser';

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
      <h1 className={styles.title}>International Dream Journal</h1>
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
              <Grid container spacing={2}>
                <Grid item md={9} xs={12}>
                  <Typography
                    variant="h3"
                    className={`${styles.dreamTitle} ${styles[theme]}`}
                  >
                    {dream.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={`${styles.dreamDescription} ${styles[theme]}`}
                  >
                    {parse(dream.description.slice(0, 100))}...
                  </Typography>
                </Grid>
                {dream.image && (
                  <Grid item md={3} xs={12}>
                    <Image
                      src={dream.image}
                      alt={dream.title}
                      style={{ borderRadius: '16px' }}
                      width={840}
                      height={350}
                      className="me-2 my-4 border"
                      objectFit="cover"
                    />
                  </Grid>
                )}
              </Grid>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DreamList;
