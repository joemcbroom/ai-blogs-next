import { NextResponse } from 'next/server'

export const middleware = (req) => {
  // TODO: implement supabase auth middleware
  // should add user to req.user
  // we can conditionally handle requests based on user role
  if (req.nextUrl.pathname.includes('generate')) {
    // must be supabase authed with role 'admin'
    if (false && req.user?.role !== 'admin') { // remove false here
      return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
  }
};

