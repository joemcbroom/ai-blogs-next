import { Database } from '#/lib/types/database.types';

export type DB = Database;
export type Post = Database['public']['Tables']['post']['Row'];
export type PostInsert = Database['public']['Tables']['post']['Insert'];
export type PostUpdate = Database['public']['Tables']['post']['Update'];
export type BlogSpace = Database['public']['Tables']['space']['Row'];
export type BlogSpaceInsert = Database['public']['Tables']['space']['Insert'];
export type BlogSpaceUpdate = Database['public']['Tables']['space']['Update'];
export type PostPreviousVersion =
	Database['public']['Tables']['post_previous_version']['Row'];

export type AbbreviatedPost = {
	title: string;
	slug: string;
	description: string | null;
	created_at: string;
	updated_at: string | null;
	is_published: boolean;
	id: number;
	space_id: number;
	space: {
		title: string;
		id: number;
	};
};

export type PostDelete = {
	id: number;
};

export type BlogSpaceWithAbbreviatedPosts = BlogSpace & {
	posts: AbbreviatedPost[] | null;
};

export type BlogSpaceWithPosts = BlogSpace & {
	posts: Post[] | null;
};

export type User = Database['public']['Tables']['profiles']['Row'];
