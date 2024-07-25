import type { Metadata } from 'next';
import NextLink from 'next/link';
import { Noto_Sans_JP } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import './globals.css';

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
      <body className={inter.className}>
        <header className="z-50 fixed top-0 left-0 right-0 flex items-center justify-between p-3 border-b border-gray-300 bg-white main-header">
          <NextLink href="/" className="">
            <p className="text-lg font-semibold">Takeshi Nojiri</p>
          </NextLink>
        </header>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
