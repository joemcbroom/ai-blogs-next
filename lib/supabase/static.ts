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
		.select('*, space:space_id (image_path, slug, description, title)')
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

	posts.sort(sortByUpdatedOrCreated());

	return posts as PostWithSpace[];
};

export const getFeaturedPosts = async () => {
	const { data: posts, error } = await supabase
		.from('post')
		.select(`*, space!inner(slug, image_path, title, is_published)`)
		.eq('is_published', true)
		.eq('space.is_published', true)
		.order('created_at', { ascending: false })
		.limit(6);

	if (error) {
		console.error(error);
		throw error.message;
	}

	posts.sort(sortByUpdatedOrCreated());

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

	spaces.sort(sortByUpdatedOrCreated());

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

export const getAllPostSlugs = async () => {
	const { data: posts, error } = await supabase
		.from('post')
		.select(
			`slug, created_at, updated_at, space!inner(slug, created_at, updated_at)`
		)
		.eq('is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	type PostWithSpace = {
		slug: string;
		created_at: string;
		updated_at?: string;
		space: {
			slug: string;
			created_at: string;
			updated_at?: string;
		};
	};

	return posts as PostWithSpace[];
};

type ItemSortProps = { [x: string]: any };
const sortByUpdatedOrCreated = ():
	| ((a: ItemSortProps, b: ItemSortProps) => number)
	| undefined => {
	return (a, b) => {
		const aDate = new Date(a.updated_at ?? a.created_at);
		const bDate = new Date(b.updated_at ?? b.created_at);
		return bDate.getTime() - aDate.getTime();
	};
};
