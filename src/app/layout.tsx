import ProgressProvider from '@/components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Results Publications | Limkokwing',
  description:
    'Limkokwing University of Creative Technology, Results Publications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='container mx-auto px-4 md:px-20'>
          <h1 className='text-4xl font-bold text-zinc-300 text-center mt-14 mb-2'>
            <Link href='/'>Student Results</Link>
          </h1>
          <div className='flex justify-center'>
            <Image alt='Logo' src='/logo.png' width={280} height={200} />
          </div>
          <ProgressProvider>{children}</ProgressProvider>
        </main>
      </body>
    </html>
  );
}
