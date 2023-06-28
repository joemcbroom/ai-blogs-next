'use client';

// components
import AdminLink from './NavLink';
import BlogverseLogo from '#/components/UI/BlogverseLogo';

// library
import {
	DocumentPlusIcon,
	PlusCircleIcon,
	RectangleStackIcon,
	Cog6ToothIcon,
	DocumentDuplicateIcon,
} from '@heroicons/react/24/solid';

// framework
import { usePathname } from 'next/navigation';
import DarkToggle from '../NavBar/DarkToggle';

type AdminPage = {
	name: string;
	href: string;
	bgClass: string;
	icon: React.ReactNode;
	children?: string[];
};

const adminPages: AdminPage[] = [
	{
		name: 'New Space',
		href: '/admin/spaces/new',
		bgClass: 'bg-indigo-300',
		icon: <PlusCircleIcon className="w-6" />,
	},
	{
		name: 'New Blog Post(s)',
		href: '/admin/posts/new',
		bgClass: 'bg-violet-700',
		icon: <DocumentPlusIcon className="w-6" />,
	},
	{
		name: 'Space Viewer',
		href: '/admin/spaces',
		bgClass: 'bg-pink-600',
		icon: <RectangleStackIcon className="w-6" />,
		children: ['/edit', '/subscribers'],
	},
	{
		name: 'Post Viewer',
		href: '/admin/posts',
		bgClass: 'bg-slate-400',
		icon: <DocumentDuplicateIcon className="w-6" />,
		children: ['/edit'],
	},
	{
		name: 'Account',
		href: '/account',
		bgClass: 'bg-emerald-500',
		icon: <Cog6ToothIcon className="w-6" />,
	},
];

// path is active if it ends with the href
// or if the href is included in the currentPathname
// and ends with one of the children defined in the objects children array
function pathIsActive(currentPathname: string, page: AdminPage): boolean {
	const currentPathnameEndsWithHref = currentPathname.endsWith(page.href);

	if (currentPathnameEndsWithHref) return true;

	const currentPathnameIncludesHref = currentPathname.includes(page.href);
	const currentPathnameEndsWithChild =
		page.children ||
		[].some((child: string) => currentPathname.endsWith(child));

	return currentPathnameEndsWithChild && currentPathnameIncludesHref;
}

export default function AdminNav() {
	const currentPathname = usePathname();

	const { href: activePath, bgClass } = adminPages.find((page) =>
		pathIsActive(currentPathname, page)
	) || { href: '', bgClass: '' };

	return (
		<nav
			className={`fixed top-0 flex h-screen w-[281px] min-w-max flex-col items-center justify-center gap-3 px-10 transition-colors ${bgClass} `}
		>
			<BlogverseLogo
				type="whiteVertical"
				className="absolute top-8 w-full p-14"
			/>
			{adminPages.map(({ name, href, icon }) => (
				<AdminLink
					key={name}
					text={name}
					href={href}
					currentPathname={currentPathname}
					isActive={href === activePath}
				>
					{icon}
				</AdminLink>
			))}
			<DarkToggle />
		</nav>
	);
}
