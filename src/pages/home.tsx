import { useState } from 'react';
import DreamAI from '../components/dreamAi';
import DreamList from '../components/DreamList';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'night-theme' : 'day-theme'}>
      <div className="flex justify-end p-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded">
          {darkMode ? (
            <WbSunnyIcon style={{ color: 'inherit', fontSize: 24 }} />
          ) : (
            <NightlightRoundIcon style={{ color: 'inherit', fontSize: 24 }} />
          )}
        </button>
      </div>
      <DreamList darkMode={darkMode} />
      <DreamAI darkMode={darkMode} />
    </div>
  );
};

export default Home;
