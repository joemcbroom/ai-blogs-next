import { supabaseSingleton } from '#/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const data = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase
		.from('post')
		.insert(Array.isArray(data) ? data : [data]);
	if (error) throw error;

	return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
	const { slug, data, spaceSlug } = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('post').update(data).eq('slug', slug);
	if (error) throw error;

	return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
	const { slug } = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('post').delete().eq('slug', slug);
	if (error) throw error;

	return NextResponse.json({ success: true });
}
