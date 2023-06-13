/* eslint-disable @next/next/no-img-element */
import { getPost, supabase } from '#/lib/supabase/static';
import { ImageResponse } from 'next/server';
import PostOgImage from './PostOgImage';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '';
export const size = {
	width: 500,
	height: 300,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({
	params: { space_slug, post_slug },
}: {
	params: { space_slug: string; post_slug: string };
}) {
	const post = await getPost(post_slug);
	const imagePath = post.image_path || post.space?.image_path;
	const imageSrc = imagePath
		? `https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/${imagePath}?width=1200&height=600&resize=cover`
		: '';

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<PostOgImage backgroundImageSrc={imageSrc} title={post.title} />
		),
		// ImageResponse options
		{
			...size,
		}
	);
}
