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
          <div className='flex justify-center'>
            <Link href='/'>
              <Image alt='Logo' src='/logo.png' width={280} height={125} />
            </Link>
          </div>
          <ProgressProvider>{children}</ProgressProvider>
          <footer className='mt-10'></footer>
        </main>
      </body>
    </html>
  );
}
