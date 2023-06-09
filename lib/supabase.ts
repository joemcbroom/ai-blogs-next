import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Database } from './types/database.types';
import { BlogSpaceWithPosts } from './types/inferred.types';

const supabase = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;

export const getSpace = async (slug: string) => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(*)`)
		.eq('slug', slug)
		.single();
	if (error) throw error;
	return data as BlogSpaceWithPosts;
};

export const updateSpace = async (
	slug: string,
	data: Partial<BlogSpaceWithPosts>
) => {
	const { error } = await supabase
		.from('blog_space')
		.update(data)
		.eq('slug', slug);
	if (error) throw error;
};

export const getAllSpaces = cache(async () => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`);
	if (error) throw error;

	return data as BlogSpaceWithPosts[];
});

export const supabaseStorage = {
	upload: async ({
		file,
		bucket,
		path,
		upsert = false,
	}: {
		file: File;
		bucket: string;
		path: string;
		upsert?: boolean;
	}): Promise<string> => {
		let data;
		let error;

		if (upsert) {
			({ data, error } = await supabase.storage
				.from(bucket)
				.update(path, file, {
					cacheControl: '3600',
				}));
		} else {
			({ data, error } = await supabase.storage
				.from(bucket)
				.upload(path, file, {
					cacheControl: '3600',
				}));
		}

		if (error) throw error;
		return data!.path;
	},
	download: async ({ bucket, path }: { bucket: string; path: string }) => {
		const { data, error } = await supabase.storage.from(bucket).download(path);
		if (error) throw error;
		return data;
	},
	getPublicUrl: ({ bucket, path }: { bucket: string; path: string }) => {
		const {
			data: { publicUrl },
		} = supabase.storage.from(bucket).getPublicUrl(path);
		return publicUrl;
	},
	delete: async ({ bucket, paths }: { bucket: string; paths: string[] }) => {
		const { error } = await supabase.storage.from(bucket).remove(paths);
		if (error) throw error;
	},
};
