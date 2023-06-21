import './tailwind.css';
import '#/components/UI/admin/ContentEditor/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

import type { Metadata } from 'next';
import Providers from './providers';
import { ServerThemeProvider } from 'next-themes';
import { SITE_INFO } from '#/lib/constants/siteInfo';

export const metadata: Metadata = {
	title: SITE_INFO.title,
	description: SITE_INFO.description,
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
