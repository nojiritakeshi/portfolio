import type { Metadata } from 'next';
import NextLink from 'next/link';
import { Noto_Sans_JP } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import GitHubIcon from '@mui/icons-material/GitHub';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Noto_Sans_JP({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: "Takeshi Nojiri's Portfolio",
  description: 'my Portfolio'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon2.svg" />
        <link rel="shortcut icon" href="/favicon2.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <GoogleTagManager gtmId="GTM-MLFN75TR" />
      <body className={inter.className}>
        <header className="z-50 fixed top-0 left-0 right-0 flex items-center justify-between py-3 px-8 border-b border-gray-300 bg-white main-header">
          <NextLink href="/">
            <p className="text-lg font-semibold">Takeshi Nojiri</p>
          </NextLink>
          <NextLink
            href="https://github.com/nojiritakeshi/portfolio"
            target="_blank"
          >
            <GitHubIcon />
          </NextLink>
        </header>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
