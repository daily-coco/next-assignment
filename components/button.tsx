'use client';
import { useFormStatus } from 'react-dom';

interface IFormBtnProps {
  text: string;
}
export default function Button({ text }: IFormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        className='primary-btn h-12 hover:ring-2 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed'
      >
        {pending ? '👀 로그인 중...' : text}
      </button>
    </>
  );
}
