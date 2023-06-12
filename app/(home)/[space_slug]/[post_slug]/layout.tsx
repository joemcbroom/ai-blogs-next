import { getPost, getPostSlugs, supabase } from '#/lib/supabase/static';
import { ResolvingMetadata, Metadata } from 'next';

export const dynamic = 'force-static';

export const revalidate = 30;

export async function generateMetadata(
	{ params: { post_slug } }: { params: { post_slug: string } },
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { title, description } = await getPost(post_slug);

	const parentDescription = (await parent)?.description;

	debugger;

	return {
		title: `${title} | Blogverse.ai`,
		description: description || parentDescription,
		// keywords: tags.join(', '), TODO: get tags
	};
}

export async function generateStaticParams({
	params: { space_slug },
}: {
	params: { space_slug: string };
}) {
	const posts = await getPostSlugs(space_slug);

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
