import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number; // ? 옵셔널을 쓰는 이유는 session에 id가 없을 수도 있기 떄문이다.
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'lucky-market',
    password: process.env.COOKIE_PASSWORD!, // 뒤에 [!] 연산자 잊지말기
  });
}
