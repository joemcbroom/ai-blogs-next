import { supabase } from '#/lib/supabase/static';
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

const getPost = async (slug: string) => {
	const { data, error } = await supabase
		.from('post')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) {
		console.error(error);
		throw error.message;
	}
	return data as Post;
};

// Font
const interSemiBold = fetch(
	new URL('./Inter-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

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
			.getPublicUrl(imagePath || '');
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
					justifyContent: 'center',
				}}
			>
				{post.title}
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: 'Inter',
					data: await interSemiBold,
					style: 'normal',
					weight: 400,
				},
			],
		}
	);
}
