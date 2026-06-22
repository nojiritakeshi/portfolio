import type { Metadata } from 'next';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "Takeshi Nojiri's Portfolio",
  description: '消防士から、エンジニアへ。— interactive terminal resume'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon2.svg" />
        <link rel="shortcut icon" href="/favicon2.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <GoogleTagManager gtmId="GTM-MLFN75TR" />
      <body>{children}</body>
    </html>
  );
}
