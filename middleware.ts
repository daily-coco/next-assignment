import getSession from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/log-in': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();

  //user가 로그인 되지 않은 상태
  const isPublicUrl = publicOnlyUrls[request.nextUrl.pathname]; // false가 뜨면 ! => true : true가 되니 로그아웃 상태로 최종 체크

  if (!session.id) {
    if (!isPublicUrl) {
      return NextResponse.redirect(new URL('/log-in', request.url));
    }
  } else {
    if (isPublicUrl) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
