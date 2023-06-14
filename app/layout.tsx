import './tailwind.css';
import '#/components/UI/admin/ContentEditor/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

import type { Metadata } from 'next';
import Providers from './providers';
import { ServerThemeProvider } from 'next-themes';
import Script from 'next/script';

export const metadata: Metadata = {
	title: 'Blogverse!',
	description: 'A whole new universe of blogs',
	metadataBase: new URL(
		`https://${process.env.VERCEL_URL}` ||
			`https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
			'http://localhost:3000'
	),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ServerThemeProvider attribute="class">
			<html suppressHydrationWarning className="scroll-smooth">
				<head></head>
				<body className="relative h-full">
					<Providers>{children}</Providers>
				</body>
			</html>
		</ServerThemeProvider>
	);
}
