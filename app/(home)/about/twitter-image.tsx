import { ImageResponse } from 'next/server';
import ContentOgImage from '#/components/OgImage/ContentOgImage';
import { SITE_INFO } from '#/lib/constants/siteInfo';

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
export default async function Image() {
	return new ImageResponse(
		(
			<ContentOgImage
				backgroundImagePath="general/abstract-bg.jpg"
				title={SITE_INFO.about.title}
				description={SITE_INFO.about.description}
			/>
		),
		{
			...size,
		}
	);
}
