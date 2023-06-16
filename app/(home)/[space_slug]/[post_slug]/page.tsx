import { getPost, getSimilarPosts } from '#/lib/supabase/static';
import { Suspense } from 'react';
import PostContent from './PostContent';
import SimilarPosts from './SimilarPosts';
import { PostWithSpace } from '#/lib/types/inferred.types';

export const revalidate = 60;

export const dynamic = 'force-static';

interface PostPageProps {
	params: {
		post_slug: string;
	};
}

// @ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostPage: React.FC<PostPageProps> = async ({ params: { post_slug } }) => {
	const post = await getPost(post_slug);

	return (
		<>
			{/* @ts-expect-error */}
			<PostContent post={post} />
		</>
	);
};

export default PostPage;
