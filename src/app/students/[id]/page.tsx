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
      <div>
        <h2 className='text-xl font-semibold'>{stdNo}</h2>
        <p className='text-zinc-400 mt-2'>Faculty Remarks</p>
      </div>
      <div className='relative overflow-x-auto mt-6'>
        <table className='w-full mt-5 text-sm text-left'>
          <thead className='border-b border-gray-400 font-semibold tracking-wider '>
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
    </div>
  );
}
