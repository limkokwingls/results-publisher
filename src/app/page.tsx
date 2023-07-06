import Clickable from '@/components/Clickable';
import SearchField from '@/components/SearchField';
import { prisma } from '@/lib/db';

export default async function Home() {
  const faculties = await prisma.faculty.findMany();
  return (
    <>
      <div className='mt-5 w-full md:w-1/2 mx-auto'>
        <SearchField />
      </div>
      <div className='grid mt-10 gap-3 md:gap-5 md:grid-cols-2'>
        {faculties.map((faculty) => (
          <Clickable key={faculty.id} href={`/faculties/${faculty.id}`}>
            {faculty.name}
          </Clickable>
        ))}
      </div>
    </>
  );
}
