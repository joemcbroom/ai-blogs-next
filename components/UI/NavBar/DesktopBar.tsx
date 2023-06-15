import Link from 'next/link';
import BlogverseLogo from '../BlogverseLogo';
import DarkToggle from './DarkToggle';

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

export default DesktopBar;
