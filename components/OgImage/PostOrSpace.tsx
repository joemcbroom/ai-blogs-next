import FallbackOgImage from './FallbackOgImage';

/* eslint-disable @next/next/no-img-element */
const PostOrSpace = ({
	backgroundImagePath,
	title,
}: {
	backgroundImagePath: string | null;
	title: string;
}) => {
	if (!backgroundImagePath) return <FallbackOgImage title={title} />;

	const imageSrc =
		'https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/' +
		backgroundImagePath +
		'?width=1200&height=600&resize=cover';

	return (
		<div
			style={{
				backgroundImage: `url(${imageSrc})`,
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-end',
				position: 'relative',
				backgroundSize: 'cover',
			}}
		>
			<div
				style={{
					color: 'white',
					textAlign: 'center',
					backgroundImage:
						'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0))',
					padding: '4rem 3rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-end',
					fontSize: 48,
					fontWeight: 600,
					width: '100%',
					height: '50%',
				}}
			>
				{title}
			</div>
			<img
				style={{
					backgroundColor: 'rgba(255, 255, 255, 0.75)',
					borderRadius: '1rem',
					width: '400px',
					height: '120px',
					position: 'absolute',
					top: '2rem',
					right: '4rem',
					objectFit: 'contain',
					padding: '0.75rem 0rem 0rem 0.5rem',
				}}
				src="https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/space/logo-blogverse-horiz.png?width=300&height=120&resize=contain"
				alt="Blogverse logo"
			/>
		</div>
	);
};

export default PostOrSpace;
