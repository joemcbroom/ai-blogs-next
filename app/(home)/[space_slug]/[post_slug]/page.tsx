import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import PostContent from './PostContent';

export const revalidate = 30;

const getPost = async (post_slug: string) => {
	const { data: post, error } = await supabase
		.from('post')
		.select('*')
		.eq('slug', post_slug)
		.single();

	if (error) {
		console.error(error);
		throw error.message;
	}

	return post as Post;
};

interface PostPageProps {
	params: {
		post_slug: string;
	};
}

// @ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostPage: React.FC<PostPageProps> = async ({ params: { post_slug } }) => {
	const post = await getPost(post_slug);
	// @ts-expect-error
	return <PostContent post={post} />;
};

export default PostPage;
