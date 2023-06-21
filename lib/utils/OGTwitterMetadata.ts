export const OGTwitterMetadata = ({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path: string;
}) => ({
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'Blogverse.ai',
		url: getUrl(path),
		title,
		description,
	},
	twitter: {
		card: 'summary_large_image',
		site: '@Blogverse_ai',
		title,
		description,
	},
});

const getUrl = (path: string) =>
	`https://${process.env.METADATA_BASE || process.env.VERCEL_URL}/${path}`;
