import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/DreamAI.module.css';
import Script from 'next/script';

const DreamAI = ({ darkMode }: { darkMode: boolean }) => {
  const router = useRouter();
  const [dream, setDream] = useState('');
  const [isAdDisplayed, setIsAdDisplayed] = useState(false);
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [dream]);

  useEffect(() => {
    if (isAdDisplayed) {
      const timer = setTimeout(() => {
        handleInterpretation();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isAdDisplayed]);

  useEffect(() => {
    const lastRequestTime = localStorage.getItem('lastRequestTime');
    if (lastRequestTime) {
      const now = new Date().getTime();
      const timeDiff = now - parseInt(lastRequestTime, 10);
      if (timeDiff < 3 * 60 * 60 * 1000) {
        setError('You can only submit a request every 3 hours.');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastRequestTime = localStorage.getItem('lastRequestTime');
    const now = new Date().getTime();

    if (
      lastRequestTime &&
      now - parseInt(lastRequestTime, 10) < 3 * 60 * 60 * 1000
    ) {
      setError('You can only submit a request every 3 hours.');
      return;
    }

    setIsAdDisplayed(true);
    setError('');
  };

  const handleInterpretation = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream }),
      });

      if (!response.ok) {
        throw new Error(`Failed to interpret dream: ${response.statusText}`);
      }

      const data = await response.json();
      setInterpretation(data.interpretation);
      localStorage.setItem('lastRequestTime', new Date().getTime().toString());

      // Interpretation and dream saving to db
      await fetch('/api/save-dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dream,
          interpretation: data.interpretation,
        }),
      });

      // Navigation
      router.push({
        pathname: '/interpretation',
        query: { dream, interpretation: data.interpretation },
      });
    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDreamChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1700) {
      setDream(value);
    }
  };

  const theme = darkMode ? 'dark' : 'light';

  return (
    <div className={`${styles.dreamAIContainer} ${styles[theme]}`}>
      {!isAdDisplayed ? (
        <>
          <p className={styles.paraph}>
            Didn't find what you were looking for? <br /> How about explaining
            your dream in more detail?
          </p>
          <form
            onSubmit={handleSubmit}
            className={`${styles.form} ${styles[theme]}`}
          >
            <textarea
              ref={textareaRef}
              value={dream}
              onChange={handleDreamChange}
              placeholder="Enter your dream..."
              className={`${styles.textarea} ${styles[theme]}`}
              required
              spellCheck={false}
            />
            <div
              className={`${styles.charCount} ${styles[theme]} flex justify-end mb-1`}
            >
              {dream.length} / 1700 characters
            </div>
            <button
              type="submit"
              className={`${styles.button} ${styles[theme]}`}
              disabled={loading}
            >
              {loading ? 'Interpreting...' : 'Interpret Dream'}
            </button>
          </form>
          {error && (
            <p className={`${styles.error} ${styles[theme]}`}>{error}</p>
          )}
        </>
      ) : (
        <div>
          <p className={styles.paraph}>
            Your dream is being interpreted, please wait.
          </p>
          <div className="adsense-ad">
            <Script
              id="adsense"
              async
              strategy="afterInteractive"
              onError={(e) => {
                console.error('AdSense script failed to load', e);
              }}
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5633161613176687`}
            />
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-5633161613176687"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamAI;
