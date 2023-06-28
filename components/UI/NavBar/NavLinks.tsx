'use client';
import Link from 'next/link';
import DarkToggle from './DarkToggle';
import { useSupabase } from '#/lib/hooks/useSupabase';

const NavLinks = ({ variant = 'nav' }: { variant?: 'footer' | 'nav' }) => {
	const { session } = useSupabase();
	const onClick = () => {
		if (variant !== 'footer') {
			document.getElementById('menu-toggle')?.click();
		}
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
			<li className="min-w-[60px]">
				{session ? (
					<Link href="/account" onClick={onClick}>
						Account
					</Link>
				) : (
					<Link href="/sign-in" onClick={onClick}>
						Sign In
					</Link>
				)}
			</li>
			<DarkToggle />
		</ul>
	);
};

export default NavLinks;
