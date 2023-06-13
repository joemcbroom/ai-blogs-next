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

const logo = fetch(new URL('./logo.svg', import.meta.url)).then((res) =>
	res.text()
);

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
	const logoData = await logo;

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
					padding: '1rem',
					maskImage: 'radial-gradient(circle at 50% 50%, blue, transparent)',
					WebkitMaskImage:
						'radial-gradient(circle at 50% 50%, blue, transparent)', // just for reference in html
				}}
			>
				<div style={{ color: 'white', textAlign: 'center' }}>{post.title}</div>
				<div
					style={{
						position: 'absolute',
						top: '0.5rem',
						right: '0.5rem',
					}}
					dangerouslySetInnerHTML={{ __html: logoData }}
				></div>
			</div>
		),
		// ImageResponse options
		{
			...size,
		}
	);
}
