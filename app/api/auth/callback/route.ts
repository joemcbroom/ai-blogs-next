import { Database } from '#/lib/types/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
	const requestUrl = new URL(req.url);
	const code = requestUrl.searchParams.get('code');
	const redirectUrl = requestUrl.searchParams.get('redirect');

	if (code) {
		const supabase = createRouteHandlerClient<Database>({ cookies });
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(requestUrl.origin + redirectUrl);
}
