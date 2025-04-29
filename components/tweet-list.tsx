import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import TweetItem from './tweet-item';

async function getInitialTweet() {
  const tweet = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
      Like: true,
    },
  });
  return tweet;
}

export type InitialTweet = Prisma.PromiseReturnType<typeof getInitialTweet>;

export default async function TweetList() {
  const initialTweet = await getInitialTweet();
  return (
    <div>
      <TweetItem initialTweet={initialTweet} />
    </div>
  );
}
