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
    <ul className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
      {programs.map((program) => (
        <li key={program.id}>
          <Clickable
            key={program.id}
            href={`/programs/${program.id}`}
            text={program.name}
          />
        </li>
      ))}
    </ul>
  );
}
