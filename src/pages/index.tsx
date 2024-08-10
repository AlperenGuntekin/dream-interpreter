import React from 'react';
import DreamAI from '../components/dreamAi';
import DreamList from '../components/DreamList';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = darkMode ? 'dark' : 'light';

  return (
    <div
      className={`container mx-auto px-4 py-8 ${theme}`}
      style={{ minHeight: '80vh' }}
    >
      <DreamAI darkMode={darkMode} />
      <DreamList darkMode={darkMode} />
    </div>
  );
};

export default Home;
