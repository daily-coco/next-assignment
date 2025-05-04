import { useFormState } from 'react-dom';
import Button from './button';
import { handleFormReplyTweet } from '@/service/tweetService';

export default function ReplyTweet() {
  const [state, action] = useFormState(handleFormReplyTweet, null);
  return (
    <form action={action} className='flex flex-col rounded-sm bg-slate-200 p-5'>
      <div className='flex flex-col p-5'>
        <textarea
          name='reply'
          placeholder='위 트윗에 답글을 남겨보세요'
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
