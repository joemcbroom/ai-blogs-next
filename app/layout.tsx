import './tailwind.css';

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
