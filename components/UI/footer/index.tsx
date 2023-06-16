import Link from 'next/link';
import BlogverseLogo from '../BlogverseLogo';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import ShareLinks from '../ShareLinks';

const Footer = () => {
	return (
		<footer className="flex flex-col items-center space-y-2 bg-slate-800 px-4 py-6 text-slate-200 dark:bg-slate-200 dark:text-slate-500">
			<BlogverseLogo type="grayHorizontal" width={180} height={32} />
			<Link href="/spaces">Spaces</Link>
			<Link href="/featured-posts">Featured Posts</Link>
			<Link href="/about">About Us</Link>
			<section className="mb-2 w-full border border-x-0 border-slate-50 p-4 text-center text-xs dark:border-slate-300">
				{SITE_INFO.description}
			</section>
			<ShareLinks />
		</footer>
	);
};

export default Footer;
