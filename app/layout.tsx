import './tailwind.css';
import 'react-tooltip/dist/react-tooltip.css';

const getStyleVars = () => {
	const styleVars = {
		'--color-primary': '#7418E1',
		'--color-secondary': '#28b973',
		'--color-tertiary': '#F3F4F6',
	};
	return styleVars;
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
