import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

type Props = { params: { id: string } };

export default async function FacultyPage({ params }: Props) {
  const id = Number(params.id);
  const programs = await prisma.program.findMany({
    where: {
      faculty_id: id,
    },
  });

  return (
    <div className='grid mt-10 gap-3 md:gap-5 md:grid-cols-2'>
      {programs.map((program) => (
        <Clickable key={program.id} href={`/programs/${program.id}`}>
          {program.name}
        </Clickable>
      ))}
    </div>
  );
}
