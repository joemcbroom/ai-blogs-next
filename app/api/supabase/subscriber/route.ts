import { supabaseSingleton } from '#/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { email } = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('subscribers').insert({ email });

	if (error) {
		console.error(error);

		if (error.message.includes('check constraint')) {
			return NextResponse.json({ error: 'Invalid Email' });
		}

		if (error.message.includes('unique constraint')) {
			return NextResponse.json({ error: 'Email already exists' });
		}

		return NextResponse.json({ error: 'Something went wrong' });
	}

	return NextResponse.json({ success: true });
}
