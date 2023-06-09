/* eslint-disable @next/next/no-img-element */

interface ImgComponentProps {
	src: string;
	alt: string;
	className?: string;
}

export default function ImgComponent({
	src,
	alt,
	className = '',
}: ImgComponentProps) {
	return <img src={src} alt={alt} className={className} />;
}
