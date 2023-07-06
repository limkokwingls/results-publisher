import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

type Props = { params: { id: string } };

export default async function FacultyPage({ params }: Props) {
  const stdNo = Number(params.id);
  const grades = await prisma.courseGrade.findMany({
    where: {
      student_no: stdNo,
    },
  });

  return (
    <div className='mt-10 text-gray-200'>
      <h2>Results for {stdNo}</h2>
      <table className='w-full mt-5'>
        <thead className='border-b border-gray-400 font-semibold tracking-wider '>
          <th className='pb-3 text-left'>Course</th>
          <th className='pb-3 text-left'>Grade</th>
          <th className='pb-3 text-left'>Marks</th>
          <th className='pb-3 text-left'>Points</th>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td className='py-2'>
                <p>{grade.name}</p>
                <p className='text-xs text-zinc-400'>{grade.code}</p>
              </td>
              <td className='py-2'>{grade.grade}</td>
              <td className='py-2'>{grade.marks}</td>
              <td className='py-2'>{grade.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
