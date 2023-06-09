import { Database } from '#/lib/types/database.types';

export type DB = Database;
export type Post = Database['public']['Tables']['post']['Row'];
export type PostInsert = Database['public']['Tables']['post']['Insert'];
export type BlogSpace = Database['public']['Tables']['blog_space']['Row'];
export type BlogSpaceInsert =
	Database['public']['Tables']['blog_space']['Insert'];
export type BlogSpaceUpdate =
	Database['public']['Tables']['blog_space']['Update'];
export type PostPreviousVersion =
	Database['public']['Tables']['post_previous_version']['Row'];

export type AbbreviatedPost = {
	title: string;
	slug: string;
	description: string | null;
};

export type BlogSpaceWithAbbreviatedPosts = BlogSpace & {
	posts: AbbreviatedPost[] | null;
};

export type BlogSpaceWithPosts = BlogSpace & {
	posts: Post[] | null;
};

export type User = Database['public']['Tables']['profiles']['Row'];
