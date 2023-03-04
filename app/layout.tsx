import './tailwind.css';
import 'react-tooltip/dist/react-tooltip.css';
import type { Metadata } from 'next';

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
				<main>{children}</main>
			</body>
		</html>
	);
}
