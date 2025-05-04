import TweetList from '@/components/tweet-list';
import { getInitialTweet } from '../service/tweetService';
import AddTweet from '@/components/tweet-add';

export default async function MainPage() {
  const tweets = await getInitialTweet();
  return (
    <div className='p-5 flex flex-col gap-5'>
      <AddTweet />
      <TweetList initialTweets={tweets} />
    </div>
  );
}
