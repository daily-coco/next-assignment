import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { unstable_cache as nextCache } from 'next/cache';
import getSession from '@/lib/session';
import LikeButton from '@/components/like-button';

async function getTweet(id: number) {
  try {
    const tweet = await db.tweet.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        tweet: {
          select: {
            tweet: true,
            tweetId: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: userId,
      },
    },
  });

  // tweet에 생성된 like COUNT
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

const getCachedTweet = nextCache(getTweet, ['tweet-detail'], {
  tags: ['tweet-detail'],
  revalidate: 60,
});

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cacheOperation = nextCache(getLikeStatus, ['tweet-like-status'], {
    tags: [`like-status-${tweetId}`],
  });
  return cacheOperation(tweetId, userId!);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const tweet = getCachedTweet(id);
  // const tweet = await getTweet(id);

  if (!tweet) return notFound();

  //like button
  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div className='pb-36'>
      <h3 className='p-5 flex items-center gap-3 border-b border-neutral-500'>
        {tweet.user.username}
      </h3>
      <p className='p-5'>{tweet.tweet}</p>
      <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
    </div>
  );
}
