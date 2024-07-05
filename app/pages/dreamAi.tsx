'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../styles.css';

export default function DreamAI() {
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

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={`title ${styles.title}`}>Dream Interpreter</h1>
      <form onSubmit={handleSubmit} className={`form ${styles.form}`}>
        <textarea
          ref={textareaRef}
          value={dream}
          onChange={handleDreamChange}
          placeholder="Enter your dream..."
          className={`textarea ${styles.textarea}`}
          required
          spellCheck={false}
        />
        <div className={`charCount ${styles.charCount} flex justify-end mb-1`}>
          {dream.length} / 1700 characters
        </div>
        <button
          type="submit"
          className={`button ${styles.button}`}
          disabled={loading}
        >
          {loading ? 'Interpreting...' : 'Interpret Dream'}
        </button>
      </form>
      {error && <p className={`error ${styles.error}`}>{error}</p>}
      {showEmailForm && (
        <div className={`emailForm ${styles.emailForm}`}>
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
              className={`input ${styles.input} mb-0`}
              required
            />
            <button
              type="submit"
              className={`button ${styles.button}`}
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
