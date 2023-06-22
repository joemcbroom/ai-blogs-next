import '#/app/tailwind.css';
import '#/components/UI/admin/ContentEditor/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

import type { Metadata } from 'next';
import Providers from '#/app/providers';
import { ServerThemeProvider } from 'next-themes';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';
import CookiesNotification from '#/app/(home)/cookie-policy/cookies-notification';
import { BarlowCondensedFont, MontserratFont } from '#/app/fonts';

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
			<html
				suppressHydrationWarning
				className={`h-full w-full scroll-smooth ${MontserratFont.className} ${BarlowCondensedFont.variable}`}
			>
				<head></head>
				<body className="relative h-full">
					{/* @ts-expect-error */}
					<CookiesNotification />
					<Providers>{children}</Providers>
				</body>
			</html>
		</ServerThemeProvider>
	);
}
