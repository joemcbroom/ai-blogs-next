import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import {
	DB,
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
	User,
} from '#/lib/types/inferred.types';
import { AuthenticatedUser } from '../types/authenticatedUser.types';

const supabaseSingleton = async () => {
	return createServerComponentSupabaseClient<DB>({
		headers,
		cookies,
	});
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
	return profile;
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
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`);

	if (error) {
		console.error(error);
		throw error.message;
	}

	// Order data by updated_at OR created_at, descending
	data?.sort((a, b) => {
		const aDate = new Date(a.updated_at ?? a.created_at);
		const bDate = new Date(b.updated_at ?? b.created_at);
		return bDate.getTime() - aDate.getTime();
	});

	return data as BlogSpaceWithAbbreviatedPosts[];
};

export const getSpace = async (slug: string): Promise<BlogSpaceWithPosts> => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(*)`)
		.eq('slug', slug)
		.single();
	if (error) {
		console.error(error);
		throw error.message;
	}
	return data as BlogSpaceWithPosts;
};
