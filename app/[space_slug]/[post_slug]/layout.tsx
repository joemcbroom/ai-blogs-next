import { supabase } from '#/lib/supabase/static';

export const dynamic = 'force-static';

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
