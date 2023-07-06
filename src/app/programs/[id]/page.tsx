import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

type Props = { params: { id: string } };

export default async function ProgramPage({ params }: Props) {
  const id = Number(params.id);
  const studentClasses = await prisma.studentClass.findMany({
    where: {
      program_id: id,
    },
  });

  return (
    <div className='grid mt-10 gap-5 md:grid-cols-2'>
      {studentClasses.map((studentClass) => (
        <Clickable
          key={studentClass.id}
          href={`/classes/${studentClass.id}`}
          text={studentClass.name}
        />
      ))}
    </div>
  );
}
