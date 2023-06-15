/* eslint-disable @next/next/no-img-element */
import { getPost, getSpace } from '#/lib/supabase/static';
import { ImageResponse } from 'next/server';
import PostOrSpace from '#/components/OgImage/PostOrSpace';

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
	params: { space_slug },
}: {
	params: { space_slug: string };
}) {
	const space = await getSpace(space_slug);

	return new ImageResponse(
		<PostOrSpace backgroundImagePath={space.image_path} title={space.title} />,

		{
			...size,
		}
	);
}
