'use client';

// types 
import { AdminLinkProps } from '#/lib/ComponentProps';

// framework
import Link from 'next/link';

export default function AdminLink({ href, text, currentPathname }: AdminLinkProps) {
	const isActive = currentPathname === href;
	const activeClassName = `rounded-full p-3 ${isActive ? 'bg-yellow-400' : ''}`;

	return (
		<Link href={href} className={`rounded ${activeClassName}`}>
			{text}
		</Link>
	);
}
