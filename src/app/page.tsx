import Clickable from '@/components/Clickable';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='mb-32 grid text-center lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
        <Clickable href='#' text='Degree Programs' />
        <Clickable href='#' text='Diploma Programs' />
        <Clickable href='#' text='Certificate Programs' />
      </div>
    </main>
  );
}
