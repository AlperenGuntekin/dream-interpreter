import { Inter } from 'next/font/google';
import Head from 'next/head';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Dream Interpretation</title>
        <meta
          name="description"
          content="Explore the meanings behind your dreams with Dream Interpreter. Our advanced AI analyzes and interprets your dreams, providing insights into your subconscious mind. Find detailed dream explanations, share your experiences, and get personalized interpretations. Discover the secrets of your dreams today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
