import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';
interface Routes {
  [key: string]: boolean;
}

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const publicOnlyUrls: Routes = {
    '/': true,
    '/log-in': true,
    '/create-account': true,
  };

  //user가 로그인 되지 않은 상태
  const exists = publicOnlyUrls[request.nextUrl.pathname]; // false가 뜨면 ! => true : true가 되니 로그아웃 상태로 최종 체크

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/log-in', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
