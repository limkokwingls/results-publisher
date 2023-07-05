type Props = {
  href: string;
  text: string;
};

export default function Clickable({ href, text }: Props) {
  return (
    <a
      href={`${href}`}
      className='group rounded-lg border dark:border-zinc-900 px-10 py-8 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
      target='_blank'
      rel='noopener noreferrer'
    >
      <h2 className={`text-xl font-semibold`}>
        {text}{' '}
        <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
          -&gt;
        </span>
      </h2>
    </a>
  );
}
