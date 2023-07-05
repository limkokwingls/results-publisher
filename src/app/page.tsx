import Clickable from '@/components/Clickable';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-zinc-300 text-center mt-14 mb-2'>
          Result Publication
        </h1>
        <Image alt='Logo' src='/logo.png' width={325} height={200} />
      </div>
      <div className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
        <Clickable href='/programs?level=degree' text='Degree Programs' />
        <Clickable href='/programs?level=degree' text='Diploma Programs' />
        <Clickable href='/programs?level=degree' text='Certificate Programs' />
      </div>
    </main>
  );
}
