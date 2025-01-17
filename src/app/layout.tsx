import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Student Results | Limkokwing',
  description:
    'Limkokwing University of Creative Technology, Results Publications',
  openGraph: {
    title: 'Student Results | Limkokwing',
    description:
      'Limkokwing University of Creative Technology, Results Publications',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Limkokwing University Logo',
      },
    ],
    locale: 'en_US',
    siteName: 'Limkokwing University',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Results | Limkokwing',
    description:
      'Limkokwing University of Creative Technology, Results Publications',
    images: ['/logo.png'],
  },
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
