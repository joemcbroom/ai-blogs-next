import { getPost } from '#/lib/supabase/static';
import { notFound } from 'next/navigation';
import PostContent from './PostContent';

export const revalidate = 360;

export const dynamic = 'force-static';

interface PostPageProps {
	params: {
		post_slug: string;
	};
}

// @ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostPage: React.FC<PostPageProps> = async ({ params: { post_slug } }) => {
	try {
		const post = await getPost(post_slug);

		// @ts-expect-error
		return <PostContent post={post} />;
	} catch (e) {
		return notFound();
	}
};

export default PostPage;
