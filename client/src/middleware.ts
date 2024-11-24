import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const userCookie = request.cookies.get('user');

 
  if (!userCookie && (pathname.startsWith('/home') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }


  let userData;
  try {
    userData = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }


  if (pathname.startsWith('/home') || pathname.startsWith('/admin') || pathname.startsWith('/filterontheleft') || pathname.startsWith('/about-us') || pathname.startsWith('/contact-us') || pathname.startsWith('/faqs') || pathname.startsWith('/our-team') || pathname.startsWith('/blog')) {
   
    if (!userData) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

  
    if (pathname.startsWith('/admin') && !userData.isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/admin/:path*' , '/filterontheleft/:path* ', '/about-us/:path*', '/contact-us/:path*', '/faqs/:path* ', '/our-team/:path*  ', '/blog/:path* '],
};
