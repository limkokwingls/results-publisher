import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

type Student = {
  id: number;
  name: string;
  is_blocked: boolean;
  remarks: string;
  course_grades?: Grade[];
};

type Grade = {
  id: number;
  name: string;
  code: string;
  grade: string;
  marks: number;
  points: number;
};

export default async function FacultyPage({ params }: Props) {
  const student = (
    await getDoc(doc(db, 'students', params.id))
  ).data() as Student;

  if (!student) {
    return notFound();
  }

  return (
    <div className='mt-10 text-gray-200 print:text-black p-5 rounded-lg border border-zinc-700'>
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold'>{params.id}</h2>
            <p className='text-sm text-zinc-400 print:text-zinc-600'>
              {student?.name}
            </p>
          </div>
          <div>
            <p className='text-xl font-semibold'>2024-08</p>
            <p className='text-sm text-zinc-400 print:text-zinc-600'>
              Semester
            </p>
          </div>
        </div>
        <div className='text-xs mt-2 px-2 py-4 bg-zinc-800 print:bg-white border border-zinc-700'>
          {student?.is_blocked ? (
            <span>Blocked! Please consult Finance Department</span>
          ) : (
            <span>{student?.remarks || 'No Remarks'}</span>
          )}
        </div>
      </div>
      {!student?.is_blocked && <GradesTable grades={student.course_grades} />}
    </div>
  );
}

async function GradesTable({ grades }: { grades?: Grade[] }) {
  return (
    <div className='relative overflow-x-auto mt-6'>
      <table className='w-full mt-5 text-sm text-left'>
        <thead className='border-b border-gray-400 font-semibold tracking-wider '>
          <tr className='text-xs sm:text-sm'>
            <th scope='col' className='pb-3 text-left text-sm'>
              Course
            </th>
            <th scope='col' className='pb-3 text-right sm:text-left'>
              Grade
            </th>
            <th scope='col' className='pb-3 text-right sm:text-left'>
              Marks
            </th>
            <th scope='col' className='pb-3 text-right sm:text-left'>
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {grades?.map((grade) => (
            <tr key={grade.code}>
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
  );
}
