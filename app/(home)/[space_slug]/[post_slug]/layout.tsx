import { SITE_INFO } from '#/lib/constants/siteInfo';
import { getPost, getPostSlugs, supabase } from '#/lib/supabase/static';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';
import { ResolvingMetadata, Metadata } from 'next';

export const revalidate = 360;

export async function generateMetadata(
	{ params: { post_slug } }: { params: { post_slug: string } },
	parent: ResolvingMetadata
): Promise<Metadata> {
	try {
		const { title, description, space } = await getPost(post_slug);

		const parentDescription = (await parent)?.description;

		return {
			title: SITE_INFO.post_slug.title.replace('%s', title),
			description: description || parentDescription,
			...OGTwitterMetadata({
				title: SITE_INFO.post_slug.title.replace('%s', title),
				description: description || '',
				path: `${space.slug}/${post_slug}`,
			}),
			// keywords: tags.join(', '), TODO: get tags
		};
	} catch (e) {
		return {
			title: `Blogverse.ai`,
			description: 'Blogverse.ai',
		};
	}
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
