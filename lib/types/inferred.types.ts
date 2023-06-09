import { Database } from '#/lib/types/database.types';

export type DB = Database;
export type Post = Database['public']['Tables']['post']['Row'];
export type PostInsert = Database['public']['Tables']['post']['Insert'];
export type BlogSpace = Database['public']['Tables']['space']['Row'];
export type BlogSpaceInsert = Database['public']['Tables']['space']['Insert'];
export type BlogSpaceUpdate = Database['public']['Tables']['space']['Update'];
export type PostPreviousVersion =
	Database['public']['Tables']['post_previous_version']['Row'];

// export type AbbreviatedPost = {
// 	title: string;
// 	slug: string;
// 	description: string | null;
// 	created_at: string;
// 	updated_at: string | null;
// };

export type PostDelete = {
	id: number;
};

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type PartialPost = AtLeast<Post, 'created_at' | 'updated_at'>;

export type BlogSpaceWithAbbreviatedPosts = BlogSpace & {
	posts: Partial<Post>[] | null;
};

export type BlogSpaceWithPosts = BlogSpace & {
	posts: (Post[] & { sort: () => void }) | null;
};

export type User = Database['public']['Tables']['profiles']['Row'];
