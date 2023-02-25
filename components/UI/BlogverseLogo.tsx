import ImgComponent from '#/components/UI/ImgComponent';

interface BlogverseLogoProps {
	type: 'star' | 'horizontal' | 'vertical' | 'whiteVertical';
	className?: string;
}

const logos = {
	star: '/images/logos/logo-blogverse-star.svg',
	horizontal: '/images/logos/logo-blogverse-horiz.svg',
	vertical: '/images/logos/logo-blogverse-vert.svg',
	whiteVertical: '/images/logos/logo-blogverse-vert-wht.svg',
};

export default function BlogverseLogo({
	type,
	className = '',
	...rest
}: BlogverseLogoProps) {
	const logo = logos[type];
	return (
		<ImgComponent
			src={logo}
			alt="Blogverse Logo"
			className={className}
			{...rest}
		/>
	);
}
