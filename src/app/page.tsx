import SearchField from '@/components/SearchField';

export default async function Home() {
  return (
    <>
      <div className='mt-5 w-full md:w-1/2 mx-auto'>
        <SearchField />
      </div>
    </>
  );
}
