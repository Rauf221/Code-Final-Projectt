import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const userCookie = request.cookies.get('user');

  // If no user is logged in, redirect to login for /home or /admin routes
  if (!userCookie && (pathname.startsWith('/home') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Parse user data from the cookie if it exists
  let userData;
  try {
    userData = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Ensure only authenticated users access /home and /admin routes
  if (pathname.startsWith('/home') || pathname.startsWith('/admin') || pathname.startsWith('/filterontheleft') || pathname.startsWith('/about-us') || pathname.startsWith('/contact-us') || pathname.startsWith('/faqs') || pathname.startsWith('/our-team')) {
    // Block access for non-logged-in users
    if (!userData) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // For /admin routes, allow only if user is an admin
    if (pathname.startsWith('/admin') && !userData.isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Allow access if all checks pass
  return NextResponse.next();
}

// Apply the middleware to both /home/* and /admin/* routes
export const config = {
  matcher: ['/home/:path*', '/admin/:path*' , '/filterontheleft/:path* ', '/about-us/:path*', '/contact-us/:path*', '/faqs/:path* ', '/our-team/:path*'],
};
