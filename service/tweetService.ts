'use server';

import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { LIMIT_NUMBER, REPLY_MIN_LENGTH } from '@/lib/constants';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { connect } from 'http2';

export type InitialTweet = Prisma.PromiseReturnType<typeof getInitialTweet>;

// 초기
export async function getInitialTweet() {
  const tweet = await db.tweet.findMany({
    include: { user: true },
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweet;
}

// page
export async function getTweetsByPage(page: number) {
  const tweet = await db.tweet.findMany({
    include: { user: true },
    skip: LIMIT_NUMBER * (page - 1),
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweet;
}
// tweet count
export async function getTweetTotalCount() {
  return db.tweet.count();
}
/* count는 따로 분리 하는 이유 
    ㄴ  데이터를 가져올 때 (findMany),
    ㄴ  레코드 수를 셀 때 (count)
    => 각각 다른 작업을 하므로, 두 작업을 분리하면 불필요한 데이터 가져오기를 피할 수 있고, 쿼리의 동작을 독립적으로 최적화할 수 있기 때문이다.
 */

// tweet pagination
export async function getPaginatedTweets(page: number) {
  const tweets = await getTweetsByPage(page);
  const TWEETS_TOTAL_COUNT = await getTweetTotalCount();
  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER * page;
  return { tweets, isLastPage };
}

// ADD
const tweetSchema = z.object({
  tweet: z.string({
    required_error: 'Tweet is required.',
  }),
});
export async function handleFormAddTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get('tweet'),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }

  const session = await getSession();
  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}

// Reply
const replySchema = z.object({
  Response: z
    .string()
    .min(
      REPLY_MIN_LENGTH,
      `답글은 ${REPLY_MIN_LENGTH}글자 이상 입력해야합니다.`
    ),
});

export async function handleFormReplyTweet(_: any, formData: FormData) {
  const data = {
    response: formData.get('reply'),
  };
  const result = replySchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      isSuccess: false,
    };
  }
  const session = await getSession();
  if (session.id) {
    const reply = await db.response.create({
      data: {
        reply: result.data.reply,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}
