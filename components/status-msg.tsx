import { SparklesIcon } from '@heroicons/react/24/outline';

export default function StatusMsg() {
  return (
    <div className='mt-5 flex flex-row gap-3 p-3 items-center justify-start rounded-xl bg-teal-800 text-white'>
      <SparklesIcon className='w-5 h-5' />
      <span className='shadow-sm'>Welcome back~!👀👍</span>
    </div>
  );
}
