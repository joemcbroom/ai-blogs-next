'use client';
import Image from 'next/image';

interface BlogverseLogoProps {
	type?:
		| 'star'
		| 'horizontal'
		| 'vertical'
		| 'whiteVertical'
		| 'whiteHorizontal'
		| 'grayHorizontal';
	width?: number;
	height?: number;
	className?: string;
}

const logos = {
	star: '/images/logos/logo-blogverse-star.svg',
	horizontal: '/images/logos/logo-blogverse-horiz.svg',
	vertical: '/images/logos/logo-blogverse-vert.svg',
	whiteVertical: '/images/logos/logo-blogverse-vert-wht.svg',
	whiteHorizontal: '/images/logos/logo-blogverse-horiz-white.svg',
	grayHorizontal: '/images/logos/logo-blogverse-horiz-gray.svg',
};

export default function BlogverseLogo({
	type = 'star',
	className = '',
	width = 150,
	height = 45,
}: BlogverseLogoProps) {
	const logo = logos[type];
	const loader = ({ src }: { src: string }) => {
		return `${src}`;
	};
	return (
		<Image
			loader={loader}
			src={logo}
			alt="Blogverse Logo"
			className={className}
			width={width}
			height={height}
			priority
		/>
	);
}
