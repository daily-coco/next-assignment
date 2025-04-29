import { formatToTimeAgo } from '@/lib/utils';
import Link from 'next/link';

interface ListTweetItemProps {
  tweet: string;
  created_at: Date;
  id: number;
  Like: number;
}
export default function TweetItem({
  tweet,
  created_at,
  id,
  Like,
}: ListTweetItemProps) {
  return (
    <Link href={`/tweet/${id}`} className='flex w-full'>
      <div className='flex flex-col'>
        <span>{id}</span>
        <span>{formatToTimeAgo(created_at.toString())}</span>
      </div>
      <div>{tweet}</div>
      <div>{Like}</div>
    </Link>
  );
}
