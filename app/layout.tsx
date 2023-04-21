import './tailwind.css';
import 'react-tooltip/dist/react-tooltip.css';

import type { Metadata } from 'next';

import { AlertProvider } from '#/lib/hooks/useAlert';
import { SupabaseProvider } from '#/lib/hooks/useSupabase';

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
		<html>
			<head></head>

			<body className="h-full">
				<SupabaseProvider>
					<AlertProvider>
						<main className="h-full">{children}</main>
					</AlertProvider>
				</SupabaseProvider>
			</body>
		</html>
	);
}
