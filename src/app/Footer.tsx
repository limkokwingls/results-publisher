import { Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='flex justify-end text-white bg-black/20 md:p-3 mt-10'>
      <Link
        href={'https://github.com/limkokwingls/results-publisher'}
        className='flex items-center gap-2 text-muted-foreground'
        target='_blank'
      >
        <Github className='size-3.5' />
        <span className='mr-2 text-xs'>Source Code</span>
      </Link>
    </footer>
  );
}
