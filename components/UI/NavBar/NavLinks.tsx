'use client';
import Link from 'next/link';
import DarkToggle from './DarkToggle';
import { useSupabase } from '#/lib/hooks/useSupabase';

const NavLinks = () => {
	const { session } = useSupabase();
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
			{session ? (
				<li>
					<Link href="/account" onClick={onClick}>
						Account
					</Link>
				</li>
			) : (
				<li>
					<Link href="/sign-in" onClick={onClick}>
						Sign In
					</Link>
				</li>
			)}
			<DarkToggle />
		</ul>
	);
};

export default NavLinks;
