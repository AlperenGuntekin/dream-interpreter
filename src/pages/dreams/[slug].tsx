import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Dream } from '../../interfaces/dream';
import dreams from '../../data/dreams.json';

interface DreamProps {
  dream: Dream;
}

const DreamPage = ({ dream }: DreamProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{dream.title}</h1>
      <p>{dream.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = dreams.map((dream) => ({
    params: { slug: dream.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dream = dreams.find((d) => d.slug === slug);

  if (!dream) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dream },
  };
};

export default DreamPage;
