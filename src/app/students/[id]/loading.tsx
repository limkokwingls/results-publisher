export default function LoadingPage() {
  return (
    <div className='flex space-x-4 mt-10 border-zinc-700 p-5 rounded-lg border'>
      <div className='animate-pulse '>
        <div className='bg-zinc-700 h-5 w-40 rounded-md' />
        <div className='bg-zinc-700 h-2 w-48 mt-2' />
        <div className='bg-zinc-700 h-7 w-[60vw] mt-2' />
        <div className='bg-zinc-700 h-40 w-[65vw] mt-10' />
      </div>
    </div>
  );
}
