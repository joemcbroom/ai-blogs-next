import { createClient } from '@supabase/supabase-js';
import {
	BlogSpace,
	BlogSpaceWithPosts,
	Post,
	PostWithSpace,
} from '../types/inferred.types';

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getPost = async (post_slug: string) => {
	const { data: post, error } = await supabase
		.from('post')
		.select('*, space:space_id (image_path, slug)')
		.eq('slug', post_slug)
		.single();

	if (error) {
		console.error(`${post_slug}: ${error}`);
		throw error.message;
	}

	return post as PostWithSpace;
};

export const getPosts = async (space_slug: string) => {
	const { data: posts, error } = await supabase
		.from('post')
		.select(`*, space!inner(slug, image_path)`)
		.eq('is_published', true)
		.eq('space.slug', space_slug);

	if (error) {
		console.error(error);
		throw error.message;
	}
	return posts as PostWithSpace[];
};

export const getSpace = async (space_slug: string) => {
	const { data: space, error } = await supabase
		.from('space')
		.select('*')
		.eq('slug', space_slug)
		.single();

	if (error) {
		console.error(`${space_slug}: ${error}`);
		throw error.message;
	}

	return space as BlogSpace;
};

export const getSpaces = async () => {
	const { data: spaces, error } = await supabase
		.from('space')
		.select('*, posts: post(slug, is_published)')
		.eq('is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	return spaces as BlogSpaceWithPosts[];
};

export const getSpaceSlugs = async () => {
	const { data, error } = await supabase
		.from('space')
		.select('slug')
		.eq('is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	return data as { slug: string }[];
};

export const getPostSlugs = async (space_slug: string) => {
	const { data: posts, error } = await supabase
		.from('post')
		.select(`slug, space!inner(slug)`)
		.eq('is_published', true)
		.eq('space.slug', space_slug);

	if (error) {
		console.error(error);
		throw error.message;
	}

	return posts as { slug: string }[];
};
