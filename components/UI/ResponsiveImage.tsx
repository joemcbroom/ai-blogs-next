import Image from 'next/image';

interface ResponsiveImageProps {
	src: string;
	width: number;
	height: number;
	alt: string;
	className?: string;
}
const shimmer = (w: number, h: number) => `
	<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<linearGradient id="g">
				<stop stop-color="#333" offset="20%" />
				<stop stop-color="#222" offset="50%" />
				<stop stop-color="#333" offset="70%" />
			</linearGradient>
		</defs>
		<rect width="${w}" height="${h}" fill="#333" />
		<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
		<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
	</svg>`;

const toBase64 = (str: string) => Buffer.from(str).toString('base64');

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
	src,
	width,
	height,
	alt,
	className,
}) => {
	return (
		<Image
			src={src ? src : '/post/space-background.jpg'}
			alt={alt}
			width={width}
			height={height}
			className={className}
			style={{ objectFit: 'cover' }}
			blurDataURL={`data:image/svg+xml;base64,${toBase64(
				shimmer(height, width)
			)}`}
			placeholder="blur"
		/>
	);
};

export default ResponsiveImage;
