import Link from 'next/link';
import BlogverseLogo from '../BlogverseLogo';

const NavLogo = ({
	width = 119,
	height = 27,
}: {
	width?: number;
	height?: number;
}) => (
	<Link href="/" className="w-full md:w-1/2">
		<BlogverseLogo
			className="z-50 w-1/2 rounded-lg pt-1 dark:hidden md:w-1/3"
			type="horizontal"
			width={width}
			height={height}
		/>
		<BlogverseLogo
			className="z-50 hidden w-1/3 rounded-lg pt-1 dark:block"
			type="whiteHorizontal"
			width={width}
			height={height}
		/>
		<span className="sr-only">Link to home page</span>
	</Link>
);

export default NavLogo;
