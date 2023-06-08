import { supabaseSingleton } from '#/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const data = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase
		.from('space')
		.insert(Array.isArray(data) ? data : [data]);
	if (error) throw error;

	return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
	const { slug, data } = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('space').update(data).eq('slug', slug);
	if (error) throw error;

	revalidatePath('/');
	revalidatePath(`/${slug}`);

	return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
	const { slug } = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('space').delete().eq('slug', slug);
	if (error) throw error;

	return NextResponse.json({ success: true });
}
