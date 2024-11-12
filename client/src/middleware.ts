// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Admin panel yollarını kontrol et
  const isAdminPanel = request.nextUrl.pathname.startsWith('/admin')
  
  if (isAdminPanel) {
    try {
      // JWT token'ı al
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      })

      // Token yoksa login sayfasına yönlendir
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      // Token'da role kontrolü yap
      if (token.role !== 'admin') {
        // Yetkisiz erişim sayfasına yönlendir
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }

      // Admin ise devam et
      return NextResponse.next()
    } catch (error) {
      // Hata durumunda login sayfasına yönlendir
      console.error('Middleware Error:', error)
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  // Admin panel değilse normal devam et
  return NextResponse.next()
}

// Sadece admin/* yolları için çalıştır
export const config = {
  matcher: '/admin/:path*'
}