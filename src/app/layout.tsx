import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from './Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Student Results | Limkokwing University Lesotho',
  description:
    'Limkokwing University of Creative Technology - Lesotho Campus, Official Results Publication Portal',
  applicationName: 'Limkokwing Results Portal',
  authors: [{ name: 'Registry Department, Limkokwing Lesotho' }],
  openGraph: {
    title: 'Student Results | Limkokwing University Lesotho',
    description:
      'Limkokwing University of Creative Technology - Lesotho Campus, Official Results Publication Portal',
    type: 'website',
    images: [
      {
        url: '/logo_original.png',
        width: 1200,
        height: 630,
        alt: 'Limkokwing University Lesotho Logo',
      },
    ],
    locale: 'en_LS',
    siteName: 'Limkokwing University Lesotho',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Results | Limkokwing University Lesotho',
    description:
      'Limkokwing University of Creative Technology - Lesotho Campus, Official Results Publication Portal',
    images: ['/logo_original.png'],
    creator: '@LimkokwingLS',
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={inter.variable}>
      <body className={inter.className}>
        <main className='min-h-[92vh]'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
