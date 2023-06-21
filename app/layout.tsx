import './tailwind.css';
import '#/components/UI/admin/ContentEditor/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

import type { Metadata } from 'next';
import Providers from './providers';
import { ServerThemeProvider } from 'next-themes';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';

export const metadata: Metadata = {
	title: SITE_INFO.title,
	description: SITE_INFO.description,
	metadataBase: new URL(
		`https://${process.env.METADATA_BASE}` ||
			`https://${process.env.VERCEL_URL}` ||
			'https://localhost:3000'
	),
	...OGTwitterMetadata({
		title: SITE_INFO.title,
		description: SITE_INFO.description,
		path: '',
	}),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ServerThemeProvider attribute="class">
			<html suppressHydrationWarning className="h-full w-full scroll-smooth">
				<head></head>
				<body className="relative h-full">
					<Providers>{children}</Providers>
				</body>
			</html>
		</ServerThemeProvider>
	);
}
