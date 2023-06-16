'use client';
import Link from 'next/link';
import DarkToggle from './DarkToggle';

const NavLinks = () => {
	const onClick = () => {
		document.getElementById('menu-toggle')?.click();
	};
	return (
		<ul className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
			<li>
				<Link href="/spaces" onClick={onClick}>
					Spaces
				</Link>
			</li>
			<li>
				<Link href="/about" onClick={onClick}>
					About
				</Link>
			</li>
			<DarkToggle />
		</ul>
	);
};

export default NavLinks;
