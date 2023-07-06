import Link from 'next/link';
import { PiArrowRightBold } from 'react-icons/pi';

type Props = {
  href: string;
  text: string;
};

export default function Clickable({ href, text }: Props) {
  return (
    <Link
      href={`${href}`}
      className='group rounded-lg border border-zinc-900 px-10 py-8 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
    >
      <h2 className={'flex gap-3 items-center'}>
        {text}
        <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
          <PiArrowRightBold />
        </span>
      </h2>
    </Link>
  );
}
