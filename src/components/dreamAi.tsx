'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/DreamAI.module.css';

export default function DreamAI({ darkMode }: { darkMode: boolean }) {
  const [dream, setDream] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream }),
      });
      if (!response.ok) throw new Error('Failed to interpret dream');
      const data = await response.json();
      setInterpretation(data.interpretation);
      setShowEmailForm(true);
    } catch (err: any) {
      setError(
        'An error occurred while interpreting your dream. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          subject: 'Your Dream Interpretation',
          message: interpretation,
        }),
      });
      if (!response.ok) throw new Error('Failed to send email');
      alert('Full interpretation sent to your email!');
    } catch (err: any) {
      setError(`An error occurred while sending the email: ${err.message}`);
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
      <p className={styles.paraph}>
        Didn't find what you were looking for? <br /> How about explaining your
        dream in more detail?
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
      {error && <p className={`${styles.error} ${styles[theme]}`}>{error}</p>}
      {showEmailForm && (
        <div className={`${styles.emailForm} ${styles[theme]}`}>
          <p className="mb-2">
            Partial interpretation: {interpretation.substring(0, 150)}...
          </p>
          <form
            onSubmit={handleEmailSubmit}
            className="flex items-center justify-between"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for full interpretation"
              className={`${styles.input} ${styles[theme]} mb-0`}
              required
            />
            <button
              type="submit"
              className={`${styles.button} ${styles[theme]}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Full Interpretation'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
