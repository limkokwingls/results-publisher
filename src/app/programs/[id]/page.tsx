import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function ProgramPage({ params }: Props) {
  const id = Number(params.id);
  const studentClasses = await prisma.studentClass.findMany({
    where: {
      program_id: id,
    },
  });

  if (studentClasses.length === 0) {
    notFound();
  }

  return (
    <div className='grid mt-10 gap-3 md:gap-5 md:grid-cols-3'>
      {studentClasses.map((studentClass) => (
        <Clickable key={studentClass.id} href={`/classes/${studentClass.id}`}>
          {studentClass.name}
        </Clickable>
      ))}
    </div>
  );
}
