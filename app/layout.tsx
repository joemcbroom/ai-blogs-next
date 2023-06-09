import './tailwind.css';
import 'react-tooltip/dist/react-tooltip.css';

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
