import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Dream } from '../../interfaces/dream';
import dreamsData from '../../data/dreams.json';
import Link from 'next/link';
import styles from '../../styles/DreamPage.module.css';
import DreamAI from '@/src/components/dreamAi';
import Header from '@/src/utils/header';

interface DreamProps {
  dream: Dream;
  relatedDreams: Dream[];
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DreamPage = ({
  dream,
  relatedDreams,
  darkMode,
  toggleDarkMode,
}: DreamProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const theme = darkMode ? 'dark' : 'light';

  return (
    <div className={`${styles.dreamPageContainer} ${styles[theme]}`}>
      <div className={`${styles.dreamPageContent} ${styles[theme]}`}>
        <h1 className={`${styles.dreamPageTitle} ${styles[theme]}`}>
          {dream.title}
        </h1>
        <p className={`${styles.dreamPageDescription} ${styles[theme]}`}>
          {dream.description}
        </p>
        <Link href="/" className={`${styles.dreamPageLink} ${styles[theme]}`}>
          Back to Home
        </Link>
      </div>
      <DreamAI darkMode={darkMode} />
      <div className={`${styles.relatedDreams} ${styles[theme]} mt-4`}>
        {relatedDreams.map((relatedDream: Dream) => (
          <div
            key={relatedDream.slug}
            className={`${styles.relatedDreamItem} ${styles[theme]}`}
          >
            <h2 className={`${styles.relatedDreamTitle} ${styles[theme]}`}>
              {relatedDream.title}
            </h2>
            <p className={`${styles.relatedDreamDescription} ${styles[theme]}`}>
              {relatedDream.description.substring(0, 100)}...
            </p>
            <Link
              className={`${styles.dreamPageLink} ${styles[theme]}`}
              href={`/dreams/${relatedDream.slug}`}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (dreamsData as Dream[]).map((dream) => ({
    params: { slug: dream.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dreams: Dream[] = dreamsData as Dream[];
  const dream = dreams.find((d) => d.slug === slug);

  if (!dream) {
    return { notFound: true };
  }

  const relatedDreams = dreams
    .filter((d) => d.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 9);

  return {
    props: { dream, relatedDreams },
  };
};

export default DreamPage;
