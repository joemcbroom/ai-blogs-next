import Link from 'next/link';
import BlogverseLogo from '../BlogverseLogo';

const NavLogo = ({
	width = 119,
	height = 27,
}: {
	width?: number;
	height?: number;
}) => {
	const sharedClasses = 'z-50 w-40 rounded-lg pt-1 md:w-1/3`';
	return (
		<Link href="/" className="z-50 w-full md:w-1/2">
			<BlogverseLogo
				className={`${sharedClasses} dark:hidden`}
				type="horizontal"
				width={width}
				height={height}
			/>
			<BlogverseLogo
				className={`${sharedClasses} hidden dark:block`}
				type="whiteHorizontal"
				width={width}
				height={height}
			/>
			<span className="sr-only">Link to home page</span>
		</Link>
	);
};

export default NavLogo;
