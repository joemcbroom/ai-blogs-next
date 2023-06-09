import './tailwind.css';
import '#/components/UI/admin/ContentEditor/styles.css';
import 'react-tooltip/dist/react-tooltip.css';

import type { Metadata } from 'next';
import Providers from './providers';
import { ServerThemeProvider } from 'next-themes';

export const metadata: Metadata = {
	title: 'Blogverse!',
	description: 'A whole new universe of blogs',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ServerThemeProvider attribute="class">
			<html suppressHydrationWarning>
				<head></head>

				<body className="relative h-full">
					<Providers>{children}</Providers>
				</body>
			</html>
		</ServerThemeProvider>
	);
}
