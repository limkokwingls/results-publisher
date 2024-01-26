import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Student Results | Limkokwing',
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
        <>{children}</>
      </body>
    </html>
  );
}
