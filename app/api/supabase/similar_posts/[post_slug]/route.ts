import { findSimilarPostsByDescriptions } from '#/lib/openai/server';
import { supabaseSingleton } from '#/lib/supabase/server';
import { Post } from '#/lib/types/inferred.types';
import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { post_slug: string } }
) {
	const { post_slug: slug } = params;
	if (!slug) throw new Error('No slug provided');

	const supabase = await supabaseSingleton();

	const { data: posts, error } = await supabase
		.from('post')
		.select(`title, description, slug, space!inner(slug, image_path)`)
		.eq('is_published', true)
		.eq('space.is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	const index = posts.findIndex((post) => post.slug === slug);
	const [postToCompare] = posts.splice(index, 1) as Partial<Post>[];
	const rest = posts as Partial<Post>[];

	const similarPosts = await findSimilarPostsByDescriptions({
		post: postToCompare,
		posts: rest,
	});

	return NextResponse.json(similarPosts);
}
