import { getAllPostSlugs } from '#/lib/supabase/static';
import { MetadataRoute } from 'next';

export const revalidate = 360;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPostSlugs();
	const URL = 'https://blogverse.ai';

	const routes = ['/', '/about', '/spaces'].map((url) => ({
		url: `${URL}${url}`,
		lastModified: new Date().toISOString(),
	}));

	const spaces = posts
		.map(({ space }) => space)
		.reduce((acc, space) => {
			if (!acc.find((s) => s.slug === space.slug)) {
				acc.push(space);
			}
			return acc;
		}, [] as (typeof posts)[0]['space'][]);

	const spaceRoutes = spaces.map(({ slug, updated_at, created_at }) => ({
		url: `${URL}/${slug}`,
		lastModified: new Date(updated_at || created_at).toISOString(),
	}));

	const postRoutes = posts.map(({ space, slug, updated_at, created_at }) => ({
		url: `${URL}/${space.slug}/${slug}`,
		lastModified: new Date(updated_at || created_at).toISOString(),
	}));

	return [...routes, ...spaceRoutes, ...postRoutes];
}
