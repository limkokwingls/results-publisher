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
    <ul className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
      {students.map((student) => (
        <li key={student.no}>
          <Clickable
            key={student.no}
            href={`/students/${student.no}`}
            text={student.name}
          />
        </li>
      ))}
    </ul>
  );
}
