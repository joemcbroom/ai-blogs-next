/* eslint-disable @next/next/no-img-element */

import Image, { ImageLoaderProps } from 'next/image';

interface ImgComponentProps {
	src: string;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
}

export default function ImgComponent({
	src,
	alt,
	className = '',
}: ImgComponentProps) {
	return <img src={src} alt={alt} className={className} />;
}
