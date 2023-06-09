import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '#/lib/types/database.types';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';

const supabaseSingleton = async () => {
	return createServerComponentSupabaseClient<Database>({
		headers,
		cookies,
	});
};

export const getAllSpaces = async () => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`)
		.order('updated_at', { ascending: false, nullsFirst: false });
	if (error) throw error;

	return data as BlogSpaceWithPosts[];
};
