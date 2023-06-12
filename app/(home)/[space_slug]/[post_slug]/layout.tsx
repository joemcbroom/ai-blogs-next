import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';

export const dynamic = 'force-static';

export const revalidate = 30;

const getPost = async (post_slug: string) => {
	const { data: post, error } = await supabase
		.from('post')
		.select('*, space:space_id (image_path)')
		.eq('slug', post_slug)
		.single();

	if (error) {
		console.error(error);
		throw error.message;
	}

	return post as Post;
};

type Props = {
	params: { post_slug: string };
};
export async function generateMetadata({ params: { post_slug } }: Props) {
	const post = await getPost(post_slug);
	const { title, description } = post;

	return {
		title: {
			template: `%s | Blogverse.ai`,
			default: title,
		},
		description,
		// keywords: tags.join(', '), TODO: get tags
	};
}

export async function generateStaticParams({
	params: { space_slug },
}: {
	params: { space_slug: string };
}) {
	const { data: posts, error } = await supabase
		.from('post')
		.select(`slug, space!inner(slug)`)
		.eq('is_published', true)
		.eq('space.slug', space_slug);

	if (error) {
		console.error(error);
		throw error.message;
	}

	if (!posts) {
		return [];
	}

	const paths = posts.map(({ slug }) => ({
		post_slug: slug,
	}));

	return paths;
}

const PostLayout = async ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default PostLayout;
