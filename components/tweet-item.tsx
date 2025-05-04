import { formatToTimeAgo } from '@/lib/utils';
import Link from 'next/link';
import { User } from '@prisma/client'; // user모델 가져오기

interface ListTweetItemProps {
  tweet: string;
  created_at: Date;
  id: number;
  user: User;
}
export default function TweetItem({
  tweet,
  created_at,
  id,
  user,
}: ListTweetItemProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className='flex flex-col gap-2 w-full hover:ring-2 ring-offset-2 rounded-sm'
    >
      <div className='flex flex-row gap-2 items-baseline'>
        <span className='font-semibold'>🍀{user.username}</span>
        <time className='text-[11px] text-gray-500'>
          {formatToTimeAgo(created_at.toString())}
        </time>
      </div>
      <div className='rounded-md p-[10px] bg-slate-200'>{tweet}</div>
    </Link>
  );
}
