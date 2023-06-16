import {
	SupabaseClient,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

import {
	DB,
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
	User,
	Post,
	AbbreviatedPost,
} from '#/lib/types/inferred.types';
import { AuthenticatedUser } from '../types/authenticatedUser.types';
import { findSimilarPostsByDescriptions } from '../openai/server';

let supabaseClientInstance: SupabaseClient | null = null;

export const supabaseSingleton = async (): Promise<SupabaseClient> => {
	// only import cookies when this function is called to avoid errors on static site generation
	const { cookies } = await import('next/headers');
	if (!supabaseClientInstance) {
		supabaseClientInstance = createServerComponentClient<DB>({
			cookies,
		});
	}
	return supabaseClientInstance;
};

export const getAuthenticatedUser =
	async (): Promise<AuthenticatedUser | null> => {
		const supabase = await supabaseSingleton();
		const { data, error } = await supabase.auth.getSession();
		if (error) {
			console.error(error);
			throw new Error(error.message);
		}

		const user = data?.session?.user;
		if (!user) return null;
		return user;
	};

export const getProfile = async (user?: any): Promise<User> => {
	const supabase = await supabaseSingleton();
	user ??= await getAuthenticatedUser();
	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();
	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
	return profile as User;
};

export const userIsAdmin = async (
	user?: AuthenticatedUser | null
): Promise<boolean> => {
	const supabase = await supabaseSingleton();
	user ??= await getAuthenticatedUser();
	if (!user) return false;
	const { data: isAdmin } = await supabase.rpc('is_admin', {
		user_id: user.id,
	});
	return isAdmin ?? false;
};

export const getAllTags = async () => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase.from('tag').select('*');
	if (error) {
		console.error(error);
		throw error.message;
	}
	return data;
};

export const getAllSpaces = async (): Promise<
	BlogSpaceWithAbbreviatedPosts[]
> => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('space')
		.select(`*, posts: post(title, slug, description)`);

	if (error) {
		console.error(error);
		throw error.message;
	}

	// Order data by updated_at OR created_at, descending
	data?.sort(sortByUpdatedOrCreated());

	return data as BlogSpaceWithAbbreviatedPosts[];
};

export const getAllPosts = async (): Promise<AbbreviatedPost[]> => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('post')
		.select(
			'title, slug, description, created_at, updated_at, is_published, id, space: space(title, id)'
		);

	// Order data by updated_at OR created_at, descending
	data?.sort(sortByUpdatedOrCreated());

	if (error) {
		console.error(error);
		throw error.message;
	}
	return data as AbbreviatedPost[];
};

export const getSpace = async (slug: string): Promise<BlogSpaceWithPosts> => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('space')
		.select(`*, posts: post(*)`)
		.eq('slug', slug)
		.single();

	// Order posts by updated_at OR created_at, descending
	const space = {
		...data,
		posts:
			Array.isArray(data?.posts) && data?.posts?.sort(sortByUpdatedOrCreated()),
	};

	if (error) {
		console.error(error);
		throw error.message;
	}
	return space as BlogSpaceWithPosts;
};

export const getPost = async (
	slug: string
): Promise<
	Post & { space: { title: string; description: string; slug: string } }
> => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('post')
		.select('*, space: space(title, description, slug)')
		.eq('slug', slug)
		.single();

	if (error) {
		console.error(error);
		throw error.message;
	}
	return data as Post & {
		space: { title: string; description: string; slug: string };
	};
};

export const getSimilarPosts = async (slug: string) => {
	if (!slug) throw new Error('No slug provided');

	const supabase = await supabaseSingleton();

	const { data: posts, error } = await supabase
		.from('post')
		.select(`*, space!inner(slug, image_path)`)
		.eq('is_published', true)
		.eq('space.is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	const index = posts.findIndex((post) => post.slug === slug);
	const [postToCompare] = posts.splice(index, 1) as Post[];
	const rest = posts as Post[];

	const similarPosts = findSimilarPostsByDescriptions({
		post: postToCompare,
		posts: rest,
	});

	return similarPosts;
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
