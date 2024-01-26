import SearchField from '@/components/SearchField';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className='container px-4 md:px-20 h-[70vh] flex items-center flex-col justify-center'>
      <Link href='/'>
        <Image alt='Logo' src='/logo.png' width={280} height={125} />
      </Link>
      <div className='mt-5 w-full md:w-1/2'>
        <SearchField />
      </div>
    </main>
  );
}
