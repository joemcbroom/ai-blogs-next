import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '#/lib/types/database.types';

const protectedPaths = ['/admin'];

const redirect = ({
	request,
	path,
}: {
	request: NextRequest;
	path: string;
}) => {
	return NextResponse.redirect(new URL(path, request.url), {
		status: 302,
		headers: {
			'Cache-Control': 'no-cache',
		},
	});
};

export async function middleware(request: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient<Database>({
		req: request,
		res,
	});

	const { pathname } = request.nextUrl;

	const isProtectedPath = protectedPaths.some((path) =>
		pathname.startsWith(path)
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: isAdmin } = await supabase.rpc('is_admin', {
		user_id: session?.user.id ?? '',
	});

	// For protected paths, redirect to sign-in if not logged in or to home if not admin
	if (isProtectedPath) {
		if (!session) {
			return redirect({ request, path: '/sign-in' });
		}
		if (!isAdmin) {
			return redirect({ request, path: '/' });
		}
	}

	return res;
}
