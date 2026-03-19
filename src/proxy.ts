import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = 
    request.headers.get('Authorization')?.split('Bearer ')[1] ?? 
    request.cookies.get('mission_control_token')?.value;

  const validToken = process.env.MISSION_CONTROL_TOKEN || 'MISSION_CONTROL_TOKEN';

  // Allow access to an emergency auth endpoint, or if token matches
  if (token === validToken) {
    return NextResponse.next();
  }

  // To allow users to easily set the cookie for UI access without a login form:
  // If they pass ?auth=TOKEN in the URL, set the cookie and redirect
  const queryToken = request.nextUrl.searchParams.get('auth');
  if (queryToken === validToken) {
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
    response.cookies.set('mission_control_token', validToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  // Return 401 for unauthorized
  return new NextResponse('Unauthorized: Bearer token or mission_control_token cookie required.', { status: 401 });
}

export const config = {
  // Protect all routes except static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
