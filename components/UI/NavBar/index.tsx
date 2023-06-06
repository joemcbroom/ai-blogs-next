import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import BlogverseLogo from '../BlogverseLogo';
import Link from 'next/link';

const NavBar = () => {
	return (
		<nav className="relative bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
			{/* mobile bar collapsed */}
			<div className="relative flex items-center justify-between px-4 py-2 md:hidden">
				<BlogverseLogo
					className="w-1/3"
					type="horizontal"
					width={119}
					height={27}
				/>
				<input
					type="checkbox"
					id="menu-toggle"
					className="peer/menu-toggle hidden"
				/>
				<label
					htmlFor="menu-toggle"
					className="z-50 block peer-checked/menu-toggle:hidden"
				>
					<Bars3Icon className="h-6 w-6 " />
				</label>
				<label
					htmlFor="menu-toggle"
					className="z-50 hidden peer-checked/menu-toggle:block"
				>
					<XMarkIcon className="h-6 w-6 " />
				</label>
				{/* full height menu when menu-toggle is checked */}
				<div className="absolute left-0 top-0 z-40 grid h-screen w-screen -translate-y-full place-items-center bg-neutral-100 transition-transform peer-checked/menu-toggle:translate-y-0 dark:bg-neutral-900">
					<ul className="flex flex-col items-center space-y-4">
						<li>
							<Link href="/">Spaces</Link>
						</li>
						<li>
							<Link href="/about">About Us</Link>
						</li>

						<li>dark mode toggle!</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
