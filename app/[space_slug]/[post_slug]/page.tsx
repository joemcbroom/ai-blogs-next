import { supabase } from '#/lib/supabase/static';

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

	return post;
};

interface PostPageProps {
	params: {
		post_slug: string;
	};
}
const PostPage = async ({ params: { post_slug } }: PostPageProps) => {
	const post = await getPost(post_slug);
	return <pre>{JSON.stringify(post, null, 2)}</pre>;
};

export default PostPage;
