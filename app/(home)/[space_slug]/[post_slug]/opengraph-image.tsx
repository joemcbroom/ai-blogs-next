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
	const imagePath = post.image_path || post.space?.image_path;
	const imageSrc = imagePath
		? `https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/${imagePath}?width=500&height=300&resize=cover`
		: '';
	const logoSrc =
		'https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/space/logo-blogverse-horiz.png?width=100&height=35&resize=contain';

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					backgroundImage: `url(${imageSrc})`,
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-end',
					fontSize: 28,
					fontWeight: 600,
					position: 'relative',
					backgroundSize: 'cover',
				}}
			>
				<div
					style={{
						color: 'white',
						textAlign: 'center',
						backgroundColor: 'black',
						padding: '1rem',
					}}
				>
					Tricks to Maximize Your Small-Space Vegetable Garden
				</div>
				<div
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.75)',
						borderRadius: '1rem',
						width: '120px',
						height: '40px',
						position: 'absolute',
						top: '0.5rem',
						right: '0.5rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '0.75rem 0rem 0rem 0.5rem',
					}}
				>
					<div
						style={{
							width: '100%',
							height: 35,
							backgroundImage:
								'url(https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/space/logo-blogverse-horiz.png?width=100&height=35&resize=contain)',
							backgroundRepeat: 'no repeat',
							backgroundSize: 'contain',
						}}
					/>
				</div>
			</div>
		),
		// ImageResponse options
		{
			...size,
		}
	);
}
