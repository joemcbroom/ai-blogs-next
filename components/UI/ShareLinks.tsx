'use client';
/* eslint-disable @next/next/no-img-element */
import facebook from '#/public/images/icons/facebook.svg';
import twitter from '#/public/images/icons/twitter.svg';
import pinterest from '#/public/images/icons/pinterest.svg';
import linkedin from '#/public/images/icons/linkedin.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LinkedInShare = () => {
	return (
		<>
			<script src="https://platform.linkedin.com/in.js" type="text/javascript">
				lang: en_US
			</script>
			<script type="IN/Share" data-url="https://www.linkedin.com"></script>
		</>
	);
};
type ShareLink = {
	name: string;
	href: string;
	src: 'string';
};
const ShareLinks = ({ currentPage }: { currentPage?: boolean }) => {
	const pathname = usePathname();
	const [links, setLinks] = useState<ShareLink[] | null>(null);

	useEffect(() => {
		const host = location.origin;
		const url = `${host}${pathname}`;
		setLinks([
			{
				name: 'Facebook',
				href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
				src: facebook.src,
			},
			{
				name: 'Twitter',
				href: `https://twitter.com/intent/tweet?url=${url}`,
				src: twitter.src,
			},
			{
				name: 'Pinterest',
				href: `https://pinterest.com/pin/create/button/?url=${url}`,
				src: pinterest.src,
			},
			{
				name: 'LinkedIn',
				href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
					url
				)}`,
				src: linkedin.src,
			},
		]);
	}, [pathname]);

	return (
		<>
			{links && (
				<div className="flex items-center justify-center gap-2">
					{Object.entries(links).map(([name, { href, src }]) => (
						<Link href={href} key={href} className="h-6 w-6">
							<img
								src={src}
								className="object-fit h-full w-full object-center"
								alt={`Share to ${name}`}
							/>
						</Link>
					))}
				</div>
			)}
		</>
	);
};

export default ShareLinks;
