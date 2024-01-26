import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import Image from 'next/image';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main className='container mt-10 px-4 md:px-20 flex items-center flex-col justify-center'>
      <Link href='/'>
        <Image alt='Logo' src='/logo.png' width={280} height={125} />
      </Link>
      <div className='w-full md:w-3/4'>{children}</div>
    </main>
  );
}
