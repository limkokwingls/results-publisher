import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

export default async function Home() {
  const faculties = await prisma.faculty.findMany();
  return (
    <div className='grid mt-10 gap-3 md:gap-5 md:grid-cols-2'>
      {faculties.map((faculty) => (
        <Clickable key={faculty.id} href={`/faculties/${faculty.id}`}>
          {faculty.name}
        </Clickable>
      ))}
    </div>
  );
}
