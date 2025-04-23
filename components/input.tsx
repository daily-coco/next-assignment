import { InputHTMLAttributes, ReactNode } from 'react';

interface IInputProps {
  name: string;
  icon?: ReactNode;
  errors?: string[];
}
export default function Input({
  icon,
  name,
  errors,
  ...rest
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex flex-col relative items-center'>
      <label
        htmlFor={name}
        className='absolute top-[23px] left-4 transform -translate-y-1/2 w-5 h-5'
      >
        {icon}
      </label>
      <input
        id={name}
        name={name}
        className={`px-[45px] bg-transparent rounded-full w-full h-12 focus:outline-none ring-1 focus:ring-4 ring-neutral-200 focus:ring-green-600 border-none placeholder:text-neutral-400 `}
        {...rest}
      />
      {errors?.map((error, index) => (
        <p key={index} className='mt-2 text-red-500 font-medium text-xs'>
          ❌ {error}
        </p>
      ))}
    </div>
  );
}
