/* eslint-disable @next/next/no-img-element */
import FallbackOgImage from '#/components/OgImage/FallbackOgImage';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Blogverse.ai';
export const size = {
	width: 1200,
	height: 600,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	return new ImageResponse(
		<FallbackOgImage title={SITE_INFO.description} />,

		{
			...size,
		}
	);
}
