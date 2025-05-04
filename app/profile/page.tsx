import Button from '@/components/button';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  // 만약, 쿠키가 없는 로그아웃 상태에서 path 경로로 접근을 할 때
  // session ID가 없을 때에만 아래 notFound가 실행된다.
  // profile 페이지가 접근되는걸 막아주기 위해 notFound() 함수를 이용한다.
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    'use server';
    //session 삭제 = cookie 삭제
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <main className='flex flex-col gap-20 items-center justify-center'>
      <h1 className='mt-40 text-xl font-bold'>Welcome! {user?.username}!</h1>
      <form className='w-full' action={logOut}>
        <Button text='Log out' />
      </form>
    </main>
  );
}
