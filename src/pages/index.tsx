import React from 'react';
import DreamAI from '../components/dreamAi';
import DreamList from '../components/DreamList';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  return (
    <div className="container mx-auto px-4 py-8" style={{ minHeight: '80vh' }}>
      <DreamList darkMode={darkMode} />
      <DreamAI />
    </div>
  );
};

export default Home;
