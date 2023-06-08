import { supabaseSingleton } from '#/lib/supabase/server';
import { revalidatePath } from 'next/cache';
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

	revalidatePath(`/${spaceSlug}/${slug}`);

	return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
	const { id } = await req.json();

	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('post').delete().eq('id', id);
	if (error) throw error;

	return NextResponse.json({ success: true });
}
