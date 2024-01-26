import Link from 'next/link';
import React from 'react';

export default function StudentNotFound() {
  return (
    <div className='text-center text-zinc-300 mt-10'>
      <h1 className='text-9xl font-medium'>404</h1>
      <h2 className='text-2xl font-medium mt-5'>Student Not Found</h2>
      <div className='md:w-1/2 mx-auto'>
        <p className='text-zinc-400 mt-2'>
          The student number you entered was not found. 😔
        </p>
      </div>
      <Link
        href='/'
        type='submit'
        className=' mt-10 text-white bg-zinc-700 border border-transparent hover:border-zinc-500 focus:ring-4 rounded-lg text-sm px-14 py-2'
      >
        Back
      </Link>
    </div>
  );
}
