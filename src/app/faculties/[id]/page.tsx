import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function FacultyPage({ params }: Props) {
  const id = Number(params.id);
  const programs = await prisma.program.findMany({
    where: {
      faculty_id: id,
    },
  });

  if (programs.length === 0) {
    notFound();
  }

  return (
    <div className='grid mt-10 gap-3 md:gap-5 md:grid-cols-3'>
      {programs.map((program) => (
        <Clickable key={program.id} href={`/programs/${program.id}`}>
          {program.name}
        </Clickable>
      ))}
    </div>
  );
}
