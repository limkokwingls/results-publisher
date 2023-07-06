import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function FacultyPage({ params }: Props) {
  const stdNo = Number(params.id);
  const grades = await prisma.courseGrade.findMany({
    where: {
      student_no: stdNo,
    },
  });
  const remarks = await prisma.facultyRemarks.findFirst({
    where: {
      student_no: stdNo,
    },
  });

  if (!grades) {
    notFound();
  }

  return (
    <div className='mt-10 text-gray-200'>
      <div>
        <h2 className='text-xl font-semibold'>{stdNo}</h2>
        <div className='text-xs mt-2 px-2 py-4 bg-zinc-900  border border-zinc-800'>
          {remarks?.is_blocked ? (
            <span>Blocked</span>
          ) : (
            <span>{remarks?.remarks || 'No Remarks'}</span>
          )}
        </div>
      </div>
      {!remarks?.is_blocked && (
        <div className='relative overflow-x-auto mt-6'>
          <table className='w-full mt-5 text-sm text-left'>
            <thead className='border-b border-gray-400 font-semibold tracking-wider '>
              <tr>
                <th scope='col' className='pb-3 text-left'>
                  Course
                </th>
                <th scope='col' className='pb-3 text-left'>
                  Grade
                </th>
                <th scope='col' className='pb-3 text-left'>
                  Marks
                </th>
                <th scope='col' className='pb-3 text-left'>
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td className='py-2 pe-4' scope='row'>
                    <p>{grade.name}</p>
                    <p className='text-xs text-zinc-400'>{grade.code}</p>
                  </td>
                  <td className='py-2 px-4'>{grade.grade}</td>
                  <td className='py-2 px-4'>{grade.marks}</td>
                  <td className='py-2 px-4'>{grade.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
