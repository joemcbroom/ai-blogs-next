import './tailwind.css';
import 'react-tooltip/dist/react-tooltip.css';
import type { Metadata } from 'next';
import { AlertProvider } from '#/lib/hooks/useAlert';

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

			<body>
				<AlertProvider>
					<main>{children}</main>
				</AlertProvider>
			</body>
		</html>
	);
}
