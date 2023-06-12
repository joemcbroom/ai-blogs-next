/* eslint-disable @next/next/no-img-element */
import { getPost, supabase } from '#/lib/supabase/static';
import { ImageResponse } from 'next/server';

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
	const imagePath = post.image_path;
	const imageSrc =
		`https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/${imagePath}?width=500&height=300&resize=cover` ||
		'';

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 128,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'end',
				}}
			>
				<img
					src={imageSrc}
					alt=""
					style={{
						objectFit: 'cover',
						zIndex: '0',
						width: '100%',
						objectPosition: 'center',
					}}
				/>
				<span
					style={{
						background: 'rgba(0,0,0,0.5)',
						color: 'white',
						fontSize: '2rem',
						padding: '1rem',
						zIndex: '10',
						width: '100%',
					}}
				>
					{post.title}
				</span>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
		}
	);
}
