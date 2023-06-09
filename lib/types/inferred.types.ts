import { Database } from '#/lib/types/database.types';

type Post = Database['public']['Tables']['post']['Row'];
type BlogSpace = Database['public']['Tables']['blog_space']['Row'];
type BlogSpaceInsert = Database['public']['Tables']['blog_space']['Insert'];
type PostPreviousVersion =
	Database['public']['Tables']['post_previous_version']['Row'];

type AbbreviatedPost = {
	title: string;
	slug: string;
	description: string | null;
};

type BlogSpaceWithAbbreviatedPosts = BlogSpace & {
	posts: AbbreviatedPost[] | null;
};

type BlogSpaceWithPosts = BlogSpace & {
	posts: Post[] | null;
};

type User = Database['public']['Tables']['profiles']['Row'];

export type {
	Post,
	BlogSpace,
	BlogSpaceInsert,
	PostPreviousVersion,
	BlogSpaceWithPosts,
	User,
	BlogSpaceWithAbbreviatedPosts,
};
