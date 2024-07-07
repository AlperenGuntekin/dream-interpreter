import { Inter } from 'next/font/google';
import Head from 'next/head';
import '../styles/globals.css';
import GoogleAdsense from './utils/GoogleAdsense';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAdsense pId="5633161613176687" />
    </html>
  );
}
