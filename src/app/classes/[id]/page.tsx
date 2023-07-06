import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

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

  return (
    <div className='mt-10 flex flex-col space-y-1'>
      {students.map((student) => (
        <Clickable key={student.no} href={`/students/${student.no}`}>
          {student.name}
        </Clickable>
      ))}
    </div>
  );
}
