import { getPost } from '#/lib/supabase/static';
import PostContent from './PostContent';

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
