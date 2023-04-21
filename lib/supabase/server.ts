import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import type { Database } from '#/lib/types/database.types';
import {
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
	User,
} from '#/lib/types/inferred.types';
import { AuthenticatedUser } from '../types/authenticatedUser.types';

const supabaseSingleton = async () => {
	return createServerComponentSupabaseClient<Database>({
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
	const { data: profiles, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id);
	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
	return profiles[0];
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

export const getAllSpaces = async (): Promise<
	BlogSpaceWithAbbreviatedPosts[]
> => {
	const supabase = await supabaseSingleton();
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`)
		.order('updated_at', { ascending: false, nullsFirst: false });
	if (error) {
		console.error(error);
		throw error.message;
	}

	return data;
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
	return data;
};
