/* eslint-disable @next/next/no-img-element */

import { ImgComponentProps } from '#/lib/ComponentProps';

export default function ImgComponent({ src, alt, className = '' }: ImgComponentProps) {
	if (!src) throw new Error('ImgComponent requires a src');
	return <img src={src} alt={alt} className={className} />;
}
