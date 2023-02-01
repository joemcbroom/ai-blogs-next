'use client';

// components
import AdminLink from '#/components/admin/AdminLink';

// library
import {
	DocumentPlusIcon,
	PlusCircleIcon,
	RectangleStackIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/solid';

// framework
import { usePathname } from 'next/navigation';
import BlogverseLogo from '../UI/BlogverseLogo';

const adminPages = [
	{
		name: 'New Space',
		href: '/admin/spaces/new',
		bgClass: 'bg-indigo-300',
		icon: <PlusCircleIcon className="w-6" />,
	},
	{
		name: 'New Blog Post',
		href: '/admin/new-blog-post',
		bgClass: 'bg-violet-600',
		icon: <DocumentPlusIcon className="w-6" />,
	},
	{
		name: 'Space Viewer',
		href: '/admin/spaces/viewer',
		bgClass: 'bg-rose-500',
		icon: <RectangleStackIcon className="w-6" />,
	},
	{
		name: 'Settings',
		href: '/admin/settings',
		bgClass: 'bg-emerald-500',
		icon: <Cog6ToothIcon className="w-6" />,
	},
];

export default function AdminNav() {
	const currentPathname = usePathname();
	const { bgClass } =
		adminPages.find(({ href }) => href === currentPathname) || {};

	return (
		<nav
			className={`flex flex-col justify-center items-center gap-3 h-screen sticky top-0 min-w-max px-10 transition-colors ${bgClass} `}
		>
			<BlogverseLogo
				type="whiteVertical"
				className="w-full p-14 absolute top-8"
			/>
			{adminPages.map(({ name, href, icon }) => (
				<AdminLink
					key={name}
					text={name}
					href={href}
					currentPathname={currentPathname}
				>
					{icon}
				</AdminLink>
			))}
		</nav>
	);
}
