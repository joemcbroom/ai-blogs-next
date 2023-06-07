import Image from 'next/image';

interface ResponsiveImageProps {
	src: string;
	width: number;
	height: number;
	alt: string;
	className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
	src,
	width,
	height,
	alt,
	className,
}) => {
	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			style={{ objectFit: 'cover' }}
		/>
	);
};

export default ResponsiveImage;
