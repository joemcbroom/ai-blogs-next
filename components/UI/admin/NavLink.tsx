// framework
import Link from 'next/link';

interface NavLinkProps {
	href: string;
	text: string;
	currentPathname: string | null;
	children: React.ReactNode;
}

export default function NavLink({
	href,
	text,
	currentPathname,
	children,
}: NavLinkProps) {
	const isActive = currentPathname?.endsWith(href);
	const activeClass = isActive ? 'bg-yellow-400 text-black' : 'text-white';

	return (
		<Link
			href={href}
			className={`admin-link flex w-full items-center gap-1 rounded-full px-6 py-3 transition-all ${activeClass}`}
		>
			{children} {text}
		</Link>
	);
}