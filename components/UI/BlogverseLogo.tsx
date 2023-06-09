import ImgComponent from '#/components/UI/ImgComponent';
import { BlogverseLogoProps } from '#/lib/ComponentProps';

const logos = {
	star: '/images/logos/logo-blogverse-star.svg',
	horizontal: '/images/logos/logo-blogverse-horiz.svg',
	vertical: '/images/logos/logo-blogverse-vert.svg',
	whiteVertical: '/images/logos/logo-blogverse-vert-wht.svg'
}

export default function BlogverseLogo ({ type, className = '', ...rest }: BlogverseLogoProps) {
	const logo = logos[type];
	return <ImgComponent src={logo} alt="Blogverse Logo" className={className} {...rest} />;
};
