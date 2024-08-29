import React, { useState } from 'react';
import { Comment as DreamComment } from '../interfaces/dream';
import styles from '../styles/CommentForm.module.css';

interface CommentFormProps {
  onSubmit: (comment: Omit<DreamComment, 'createdAt'>) => Promise<void>;
  darkMode: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, darkMode }) => {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      onSubmit({ name, comment });
      setName('');
      setComment('');
    }
  };

  const theme = darkMode ? 'dark' : 'light';

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.commentForm} ${styles[theme]}`}
    >
      <div className={styles.formGroup}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={`${styles.input} ${styles[theme]}`}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className={`${styles.textarea} ${styles[theme]}`}
          required
        />
      </div>
      <button type="submit" className={`${styles.button} ${styles[theme]}`}>
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
