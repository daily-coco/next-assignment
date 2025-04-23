'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { Login } from './actions';
import StatusMsg from '@/components/status-msg';
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [state, action] = useFormState(Login, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 items-center *:font-medium'>
        <h1 className='text-2xl text-center'>🍀</h1>
        <h2 className='text-xs'>만나서 반가워요!</h2>
      </div>
      <form action={action} className='flex flex-col gap-3'>
        <Input
          type='email'
          icon={<EnvelopeIcon />}
          name='formEmail'
          placeholder='Email'
          required={true}
          errors={state?.fieldErrors.formEmail}
        />
        <Input
          type='text'
          icon={<UserIcon />}
          name='formName'
          placeholder='UserName'
          required={true}
          errors={state?.fieldErrors.formName}
        />
        <Input
          type='password'
          icon={<KeyIcon />}
          name='formPassword'
          placeholder='Password'
          required={true}
          errors={state?.fieldErrors.formPassword}
        />
        <Button text='Log in' />
      </form>
      {/* {<StatusMsg />} */}
    </div>
  );
}
