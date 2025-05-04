'use client';

import { handleFormAddTweet } from '@/service/tweetService';
import { useFormState } from 'react-dom';
import Button from './button';

export default function AddTweet() {
  const [state, action] = useFormState(handleFormAddTweet, null);
  return (
    <form action={action} className='flex flex-col rounded-sm bg-slate-200 p-5'>
      <div className='flex flex-col p-5'>
        <textarea
          name='tweet'
          required
          placeholder='오늘의 한 줄은?'
          className='w-full p-5 rounded-md resize-none'
        ></textarea>

        {!state?.isSuccess && (
          <p className='text-red-400'>{state?.error.fieldErrors.tweet}</p>
        )}
        <Button text='Add' />
      </div>
    </form>
  );
}
