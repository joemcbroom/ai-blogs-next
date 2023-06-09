import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import BlogverseLogo from '../BlogverseLogo';
import Link from 'next/link';
import DarkToggle from './DarkToggle';
import MobileBar from './MobileBar';

const DesktopBar = () => (
	<div className="relative hidden items-center justify-between px-4 py-2 md:flex">
		<BlogverseLogo
			className="max-w-md rounded-lg pt-1 dark:bg-neutral-50"
			type="horizontal"
			width={200}
			height={45}
		/>
		<ul className="flex items-center space-x-4">
			<li>
				<Link href="/">Spaces</Link>
			</li>
			<li>
				<Link href="/about">About Us</Link>
			</li>
			<DarkToggle />
		</ul>
	</div>
);

const NavBar = () => {
	return (
		<nav className="relative bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
			<MobileBar />
			<DesktopBar />
		</nav>
	);
};

export default NavBar;
