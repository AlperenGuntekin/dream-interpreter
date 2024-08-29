import React, { useEffect, useState } from 'react';
import { addComment, getComments } from '../lib/comment';
import CommentForm from './CommentForm';
import { Comment as DreamComment } from '../interfaces/dream';
import styles from '../styles/CommentSection.module.css';

interface CommentSectionProps {
  dreamId: string;
  darkMode: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  dreamId,
  darkMode,
}) => {
  const [comments, setComments] = useState<DreamComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(dreamId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [dreamId]);

  const handleAddComment = async (comment: Omit<DreamComment, 'createdAt'>) => {
    try {
      await addComment(dreamId, comment);
      setComments((prevComments) => [
        ...prevComments,
        { ...comment, createdAt: new Date() },
      ]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const theme = darkMode ? 'dark' : 'light';

  return (
    <div className={`${styles.commentSection} ${styles[theme]}`}>
      <h2 className={styles.commentTitle}>Comments</h2>
      <div className={styles.commentsList}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={`${styles.comment} ${styles[theme]}`}>
              <div className={styles.commentName}>{comment.name}</div>
              <div className={styles.commentText}>{comment.comment}</div>
              <div className={styles.commentDate}>
                {comment.createdAt.toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <CommentForm onSubmit={handleAddComment} darkMode={darkMode} />
    </div>
  );
};

export default CommentSection;
