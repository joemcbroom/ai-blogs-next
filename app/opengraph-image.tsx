/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
	width: 500,
	height: 300,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
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
				<img
					src="./images/logos/logo-blogverse-horiz.svg"
					alt="Blogverse.ai logo"
					style={{
						objectFit: 'cover',
						width: '100%',
						zIndex: '0',
						objectPosition: 'center',
					}}
				/>
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
