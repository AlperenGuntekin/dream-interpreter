import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Comment } from '../interfaces/dream';

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export const addComment = async (
  dreamId: string,
  comment: Omit<Comment, 'createdAt'>
) => {
  try {
    console.log('Starting addComment function');
    const dreamRef = doc(db, 'dreams', dreamId);
    console.log('Created dreamRef:', dreamRef);

    await setDoc(dreamRef, { exists: true }, { merge: true });
    console.log('Document created/verified:', dreamId);

    const commentsRef = collection(dreamRef, 'comments');
    console.log('Comments reference created:', commentsRef);

    await addDoc(commentsRef, {
      ...comment,
      createdAt: new Date(),
    });
    console.log('Comment added successfully');
  } catch (error) {
    console.error('Error adding comment: ', error);
  }
};

export const getComments = async (dreamId: string): Promise<Comment[]> => {
  try {
    const commentsRef = collection(db, 'dreams', dreamId, 'comments');
    const commentSnapshot = await getDocs(commentsRef);

    return commentSnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Comment, 'createdAt'> & {
        createdAt: FirestoreTimestamp | Date;
      };
      return {
        ...data,
        createdAt:
          data.createdAt instanceof Date
            ? data.createdAt
            : new Date(data.createdAt.seconds * 1000),
      } as Comment;
    });
  } catch (error) {
    console.error('Error getting comments: ', error);
    return [];
  }
};
