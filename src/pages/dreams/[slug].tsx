import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Dream } from '../../interfaces/dream';
import dreamsData from '../../data/dreams.json';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/DreamPage.module.css';
import DreamAI from '@/src/components/dreamAi';
import GoogleAdsense from '@/src/utils/GoogleAdsense';
import Image from 'next/image';
import parse from 'html-react-parser';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import CommentSection from '@/src/components/CommentSection';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const theme = darkMode ? 'dark' : 'light';

  return (
    <>
      <Head>
        <title>{dream.title} - Dream Interpretation</title>
        <meta
          name="description"
          content={`Learn about the meaning of ${dream.title} and related dream interpretations.`}
        />
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          onError={(e) => {
            console.error('AdSense script failed to load', e);
          }}
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5633161613176687`}
        />
      </Head>
      <div className={`${styles.dreamPageContainer} ${styles[theme]}`}>
        <GoogleAdsense pId="ca-pub-5633161613176687" />

        <div className={`${styles.dreamPageContent} ${styles[theme]}`}>
          <h1 className={`${styles.dreamPageTitle} ${styles[theme]}`}>
            {dream.title}
          </h1>
          {dream.image && (
            <Image
              src={dream.image}
              alt={dream.title}
              style={{ borderRadius: '16px' }}
              width={840}
              height={350}
              className="me-2 my-4"
              objectFit="cover"
            />
          )}
          <p className={`${styles.dreamPageDescription} ${styles[theme]}`}>
            {parse(dream.description)}
          </p>
          <Link href="/" className={`${styles.dreamPageLink} ${styles[theme]}`}>
            Back to Home
          </Link>
        </div>
        <CommentSection dreamId={dream.slug} darkMode={darkMode} />
        <DreamAI darkMode={darkMode} />
        <div className={`${styles.dreamPageContent} ${styles[theme]}`}>
          <a href="https://www.ai-tarot.online/" target="blank">
            <h4 className={`${styles.dreamPageTitle} ${styles[theme]}`}>
              How about free tarot reading with artificial intelligence?
            </h4>
            <p className={`${styles.dreamPageDescription} ${styles[theme]}`}>
              You can click now to get a tarot reading on your birth chart,
              specific questions and many other areas.
            </p>
          </a>
        </div>
        <div className={`${styles.relatedDreams} ${styles[theme]} mt-4`}>
          {relatedDreams.map((relatedDream: Dream) => (
            <div
              key={relatedDream.slug}
              className={`${styles.relatedDreamItem} ${styles[theme]}`}
            >
              <h2 className={`${styles.relatedDreamTitle} ${styles[theme]}`}>
                {relatedDream.title}
              </h2>
              <p
                className={`${styles.relatedDreamDescription} ${styles[theme]}`}
              >
                {parse(relatedDream.description.substring(0, 100))}...
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
    </>
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

  const keywords = slug.split('-');

  let relatedDreams = dreams
    .filter((d) => {
      if (d.slug === slug) return false;

      const titleMatch = keywords.every((keyword) =>
        d.title.toLowerCase().includes(keyword.toLowerCase())
      );

      const descriptionMatch = keywords.every((keyword) =>
        d.description.toLowerCase().includes(keyword.toLowerCase())
      );

      return titleMatch || descriptionMatch;
    })
    .sort((a, b) => {
      const scoreA = keywords.reduce(
        (score, keyword) =>
          score +
          (a.title.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0) +
          (a.description.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0),
        0
      );
      const scoreB = keywords.reduce(
        (score, keyword) =>
          score +
          (b.title.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0) +
          (b.description.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0),
        0
      );
      return scoreB - scoreA;
    })
    .slice(0, 12);

  if (relatedDreams.length < 3) {
    const additionalDreams = dreams
      .filter((d) => !relatedDreams.includes(d) && d.slug !== slug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3 - relatedDreams.length);

    relatedDreams = relatedDreams.concat(additionalDreams);
  }

  return {
    props: { dream, relatedDreams },
  };
};

export default DreamPage;
