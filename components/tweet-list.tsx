'use client';

import { useEffect, useState } from 'react';
import { getPaginatedTweets, InitialTweet } from '@/service/tweetService';
import TweetItem from './tweet-item';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweet;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchMoreTweet = async () => {
      const { tweets, isLastPage } = await getPaginatedTweets(page);
      setIsLastPage(isLastPage);
      setTweets(tweets);
    };
    fetchMoreTweet();
  }, [page]);

  return (
    <div className=''>
      <div className='p-5 flex flex-col gap-5'>
        {tweets.map((tweet) => (
          <TweetItem key={tweet.id} {...tweet} />
        ))}
      </div>
      <div className='w-full flex bottom-32 fixed mx-auto gap-10 items-center justify-center'>
        <button
          className='disabled:text-stone-200'
          onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))}
          disabled={page === 1}
        >
          <ChevronLeftIcon width={20} height={20} />
        </button>
        <span>{page}</span>
        <button
          className='disabled:text-stone-200'
          onClick={() => setPage((prev) => (isLastPage ? prev : prev + 1))}
          disabled={isLastPage}
        >
          <ChevronRightIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
