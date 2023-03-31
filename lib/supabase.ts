import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Database } from './types/database.types';
import { BlogSpaceWithPosts } from './types/inferred.types';

const supabase = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;

export const getSpace = cache(async (slug: string) => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(*)`)
		.eq('slug', slug)
		.single();
	if (error) throw error;
	return data as BlogSpaceWithPosts;
});

export const getAllSpaces = cache(async () => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`);
	if (error) throw error;

	return data as BlogSpaceWithPosts[];
});
