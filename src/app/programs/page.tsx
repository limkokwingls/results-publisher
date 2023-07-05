import Clickable from '@/components/Clickable';
import { prisma } from '@/lib/db';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function ProgramsPage({ searchParams }: Props) {
  const level = searchParams.level as string;
  const programs = await prisma.programs.findMany({
    where: {
      level: level,
    },
  });

  return (
    <div>
      <h1>{level} Programs</h1>
      <ul className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
        {programs.map((program) => (
          <li key={program.id}>
            <Clickable
              key={program.id}
              href={`/programs/${program.id}`}
              text={program.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
