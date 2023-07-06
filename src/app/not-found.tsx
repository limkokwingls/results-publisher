import Link from 'next/link';

export default function NotFound() {
  return (
    <section className=''>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <p className='text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
            Not Found
          </p>
          <p className='mt-4 mb-10 text-lg font-light text-gray-500 dark:text-gray-400'>
            Sorry, the content you are looking for does not exist.
          </p>
          <a
            href='/'
            className='bg-blue-600 hover:bg-blue-700 text-gray-300 py-2 px-4 rounded'
          >
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
