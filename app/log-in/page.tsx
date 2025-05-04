'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import StatusMsg from '@/components/status-msg';

export default function LoginForm() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 items-center *:font-medium'>
        <h1 className='text-2xl text-center'>🍀</h1>
        <h2 className='text-2xl'>행운 마켓에 어서오세요!</h2>
      </div>
      <form action={action} className='flex flex-col gap-3'>
        <Input
          type='email'
          icon={<EnvelopeIcon />}
          name='formEmail'
          placeholder='Email'
          required={true}
          errors={state?.error?.fieldErrors.formEmail}
        />
        <Input
          type='password'
          icon={<KeyIcon />}
          name='formPassword'
          placeholder='Password'
          required={true}
          errors={state?.error?.fieldErrors.formPassword}
        />
        <Button text='Log in' />
      </form>
      {state?.isSuccess && <StatusMsg />}
      <div className='flex gap-2'>
        <p>👀 처음이신가요?</p>
        <Link href='/create-account' className='primary-btn py-2.5 text-lg'>
          행운과 함께 시작하기
        </Link>
      </div>
    </div>
  );
}
