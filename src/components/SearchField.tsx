'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchField() {
  const [studentNo, setStudentNo] = useState('');
  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/students/${studentNo}`);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            className='w-3 h-3 text-zinc-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 pl-10 text-sm border rounded-full bg-inherit border-zinc-500 placeholder-zinc-400 text-white focus:ring-gray-500 focus:border-gray-500'
          placeholder='Student Number'
          value={studentNo}
          onChange={(e) => setStudentNo(e.target.value)}
          required
        />
      </div>
      <div className='flex justify-center mt-5'>
        <button
          type='submit'
          className='text-white bg-zinc-700 border border-transparent hover:border-zinc-500 focus:ring-4 rounded-lg text-sm px-14 py-2 '
        >
          Search
        </button>
      </div>
    </form>
  );
}
