import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';

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
        <main className='flex min-h-screen flex-col items-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold text-zinc-300 text-center mt-14 mb-2'>
              Student Publication
            </h1>
            <Image alt='Logo' src='/logo.png' width={280} height={200} />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
