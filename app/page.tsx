'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [dream, setDream] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dream Interpreter</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Enter your dream..."
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Interpreting...' : 'Interpret Dream'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {showEmailForm && (
        <div className={styles.emailForm}>
          <p>Partial interpretation: {interpretation.substring(0, 100)}...</p>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for full interpretation"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Send Full Interpretation'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
