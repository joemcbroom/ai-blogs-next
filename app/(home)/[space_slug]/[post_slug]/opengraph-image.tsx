import { getPost, supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({
	params: { space_slug, post_slug },
}: {
	params: { space_slug: string; post_slug: string };
}) {
	const post = await getPost(post_slug);
	let imageSrc = '';
	const imagePath = post.image_path;
	if (imagePath) {
		const { data } = supabase.storage
			.from('blogverse-public')
			.getPublicUrl(imagePath || '', {
				transform: {
					width: 525,
					height: 355,
					resize: 'cover',
				},
			});
		imageSrc = data?.publicUrl || '';
	}
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
					backgroundImage: `url(${imageSrc})`,
				}}
			>
				<span
					style={{
						background: 'rgba(0,0,0,0.5)',
						color: 'white',
						fontSize: '2rem',
						padding: '1rem',
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
