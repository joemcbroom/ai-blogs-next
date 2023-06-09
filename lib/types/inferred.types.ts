import { Database } from '#/lib/types/database.types';

type Post = Database['public']['Tables']['post']['Row'];
type BlogSpace = Database['public']['Tables']['blog_space']['Row'];
type PostPreviousVersion =
	Database['public']['Tables']['post_previous_version']['Row'];

type BlogSpaceWithPosts = BlogSpace & {
	posts: Post[];
};

export type { Post, BlogSpace, PostPreviousVersion, BlogSpaceWithPosts };
