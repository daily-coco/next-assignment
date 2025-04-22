'use client';

import FormInput from '@/components/form-input'
import FormButton from '@/components/form-button'
import { useFormState } from 'react-dom';
import { handleForm } from './actions';
import StatusMsg from '@/components/status-msg';

export default function Login() {
    const [state, action] = useFormState(handleForm, null);
  
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
        <div className='flex flex-col gap-2 items-center *:font-medium'>
            <h1 className='text-2xl text-center'>🍀</h1>
            <h2 className='text-xs'>만나서 반가워요!</h2>
        </div>
        <form action={action} className='flex flex-col gap-3'>
            <FormInput type="email" icon='email' name="formEmail" placehoder='Email' required={true} />
            <FormInput type="text" icon='username' name="formName" placehoder='UserName' required={true}/>
            <FormInput type="password" icon='password' name="formPassword" placehoder='Password' required={true}  errors={state?.errors ?? []}/>
            <FormButton text="Log in" />
        </form>
        {state?.ok && 
          <StatusMsg/>
        }
    </div>
  )
}