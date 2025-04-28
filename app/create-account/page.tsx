'use client';

import FormButton from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { CreateAccount } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

export default function createAccountForm() {
  const [state, action] = useFormState(CreateAccount, null);
  return (
    <div className='flex flex-col gap-2 justify-center items-center *:font-medium h-screen'>
      <h1 className='text-2xl text-center'>Create Account </h1>
      <h2 className='text-xs'>사용할 계정 정보를 입력해 주세요.</h2>

      <form action={action} className='flex flex-col gap-3 mt-5'>
        <Input
          type='text'
          name='username'
          placeholder='Name'
          required={true}
          minLength={3}
          maxLength={10}
          errors={state?.fieldErrors.username}
        />
        <Input
          type='email'
          name='email'
          placeholder='email (ex : nomad@nomad.com)'
          required={true}
          errors={state?.fieldErrors.email}
        />
        <Input
          type='password'
          name='password'
          placeholder='password'
          min={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Input
          type='password'
          name='passwordConfirm'
          placeholder='password Confirm'
          min={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.passwordConfirm}
        />
        <FormButton text='JOIN' />
      </form>
    </div>
  );
}
