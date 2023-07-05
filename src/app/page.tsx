import Clickable from '@/components/Clickable';

export default function Home() {
  return (
    <div className='grid text-center mt-10 lg:mb-0 gap-5 lg:grid-cols-3 lg:text-left'>
      <Clickable href='/programs?level=Degree' text='Degree Programs' />
      <Clickable href='/programs?level=Diploma' text='Diploma Programs' />
      <Clickable
        href='/programs?level=Certificate'
        text='Certificate Programs'
      />
    </div>
  );
}
