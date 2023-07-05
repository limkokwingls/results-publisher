import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

export default async function Home() {
  const faculties = await prisma.faculty.findMany();
  return (
    <div className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
      {faculties.map((faculty) => (
        <Clickable
          key={faculty.id}
          href={`/faculties/${faculty.id}`}
          text={faculty.name}
        />
      ))}
    </div>
  );
}
