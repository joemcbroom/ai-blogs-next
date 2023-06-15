'use client';
/* eslint-disable @next/next/no-img-element */
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	LinkedinShareButton,
	LinkedinIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	PinterestShareButton,
	PinterestIcon,
	RedditShareButton,
	RedditIcon,
} from 'next-share';

type ShareLink = {
	name: string;
	href: string;
	src: 'string';
};
const ShareLinks = ({ currentPage }: { currentPage?: boolean }) => {
	const pathname = usePathname();
	const [url, setUrl] = useState('');

	useEffect(() => {
		const host = location.origin;
		setUrl(`${host}${pathname}`);
	}, [pathname]);

	const iconProps = {
		size: 48,
		iconFillColor: '#64748B',
		bgStyle: { fill: 'transparent' },
	};

	return (
		<div className="flex items-center justify-center">
			<FacebookShareButton url={url}>
				<FacebookIcon {...iconProps} />
			</FacebookShareButton>
			<LinkedinShareButton url={url}>
				<LinkedinIcon {...iconProps} />
			</LinkedinShareButton>
			<TwitterShareButton url={url}>
				<TwitterIcon {...iconProps} />
			</TwitterShareButton>
			<PinterestShareButton url={url} media={url}>
				<PinterestIcon {...iconProps} />
			</PinterestShareButton>
			<span
				role="presentation"
				dangerouslySetInnerHTML={{ __html: '<!-- fuck reddit -->' }}
			/>
			{/* 
			<RedditShareButton url={url}>
				<RedditIcon {...iconProps} />
			</RedditShareButton> */}
		</div>
	);
};

export default ShareLinks;
