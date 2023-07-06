'use client';

import { useState } from 'react';

export default function SearchField() {
  const [studentNo, setStudentNo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/students/${studentNo}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-400'
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
          className='block w-full p-3 pl-10 text-sm border rounded-lg bg-inherit border-zinc-700 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500'
          placeholder='Student Number'
          value={studentNo}
          onChange={(e) => setStudentNo(e.target.value)}
          required
        />
        <button
          type='submit'
          className='text-white absolute right-1 bottom-1 top-1 bg-zinc-700 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 '
        >
          Search
        </button>
      </div>
    </form>
  );
}
