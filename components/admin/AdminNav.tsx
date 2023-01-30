'use client';

import AdminLink from './AdminLink';
import { usePathname } from 'next/navigation';

const pages = [
	{
		name: 'New Space',
		href: '/admin/spaces/new',
		bgClass: 'bg-indigo-300',
	},
	{
		name: 'New Blog Post',
		href: '/admin/new-blog-post',
		bgClass: 'bg-violet-600',
	},
	{
		name: 'Space Viewer',
		href: '/admin/spaces/viewer',
		bgClass: 'bg-rose-500',
	},
	{
		name: 'Settings',
		href: '/admin/settings',
		bgClass: 'bg-emerald-500',
	},
];

export default function AdminNav() {
	const currentPathname = usePathname();
	const { bgClass } = pages.find(({ href }) => href === currentPathname) || {}

	return (
		<nav
			className={`flex flex-col justify-center items-center h-screen w-1/5 ${bgClass} transition-colors`}
		>
			{pages.map(({ name, href }) => (
				<AdminLink
					key={name}
					text={name}
					href={href}
					currentPathname={currentPathname}
				/>
			))}
		</nav>
	);
}
