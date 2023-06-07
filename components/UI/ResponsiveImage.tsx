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
	src = src.replace('/object/', '/render/image/');
	return (
		<>
			<picture>
				<source
					srcSet={`${src}?width=${width}&height=${height}`}
					media="(min-width: 1024px)"
				/>
				<source
					srcSet={`${src}?width=${width * 0.75}&height=${height * 0.75}`}
					media="(min-width: 640px)"
				/>
				<img
					src={`${src}?width=${width * 0.3}&height=${height * 0.3}`}
					alt={alt}
					className={className}
				/>
			</picture>
		</>
	);
};

export default ResponsiveImage;
