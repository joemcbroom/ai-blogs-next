'use client';

// types
import { AdminLinkProps } from '#/lib/ComponentProps';

// framework
import Link from 'next/link';

export default function AdminLink({
	href,
	text,
	currentPathname,
	children,
}: AdminLinkProps) {
	const isActive = currentPathname === href;
	const activeClass = isActive ? 'bg-yellow-400 text-black' : 'text-white';

	return (
		<Link
			href={href}
			className={`admin-link rounded-full py-3 px-6 transition-all flex items-center gap-1 w-full ${activeClass}`}
		>
			{children} {text}
		</Link>
	);
}
