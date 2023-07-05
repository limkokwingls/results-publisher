import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

type Props = { params: { id: string } };

export default async function ProgramsPage({ params }: Props) {
  const id = Number(params.id);
  const studentClasses = await prisma.studentClass.findMany({
    where: {
      program_id: id,
    },
  });

  return (
    <ul className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
      {studentClasses.map((studentClass) => (
        <li key={studentClass.id}>
          <Clickable
            key={studentClass.id}
            href={`/programs/${studentClass.id}`}
            text={studentClass.name}
          />
        </li>
      ))}
    </ul>
  );
}
