import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function ClassPage({ params }: Props) {
  const id = Number(params.id);
  const students = await prisma.student.findMany({
    where: {
      student_class_id: id,
    },
    orderBy: {
      name: 'asc',
    },
  });

  if (students.length === 0) {
    notFound();
  }

  return (
    <div className='mt-10 flex flex-col space-y-1'>
      {students.map((student) => (
        <Clickable key={student.no} href={`/students/${student.no}`}>
          <div>
            <h3 className='text-lg'>{student.no}</h3>
            <p className='text-xs text-gray-400'>{student.name}</p>
          </div>
        </Clickable>
      ))}
    </div>
  );
}
