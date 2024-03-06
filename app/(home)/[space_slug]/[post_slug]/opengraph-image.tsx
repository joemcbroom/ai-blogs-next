import { getPost } from '#/lib/supabase/static';
import { ImageResponse } from 'next/og';
import ContentOgImage from '#/components/OgImage/ContentOgImage';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '';
export const size = {
	width: 1200,
	height: 600,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({
	params: { post_slug },
}: {
	params: { post_slug: string };
}) {
	const post = await getPost(post_slug);

	return new ImageResponse(
		(
			<ContentOgImage
				backgroundImagePath={
					(post.image_path || post.space?.image_path) ?? null
				}
				title={post.title}
				description={post.description || post.space.description || ''}
			/>
		),
		{
			...size,
		}
	);
}
