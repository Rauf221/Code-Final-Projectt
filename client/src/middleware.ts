import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const userCookie = request.cookies.get('user');
  let userData = null;

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  if (!userData && ['/home', '/admin', '/filterontheleft', '/about-us', '/contact-us', '/faqs', '/our-team', '/blog'].some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (userData && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/home', request.url)); 
  }

  if (pathname.startsWith('/admin') && (!userData || !userData.isAdmin)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/admin/:path*',
    '/filterontheleft/:path*',
    '/about-us/:path*',
    '/contact-us/:path*',
    '/faqs/:path*',
    '/our-team/:path*',
    '/blog/:path*',
    '/auth/login',
    '/auth/register',
  ],
};
