/* eslint-disable @next/next/no-img-element */
const PostOgImage = ({
	backgroundImageSrc,
	title,
}: {
	backgroundImageSrc: string;
	title: string;
}) => {
	return (
		<div
			style={{
				backgroundImage: `url(${backgroundImageSrc})`,
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
					backgroundColor: 'black',
					padding: '3rem',
					fontSize: 48,
					fontWeight: 600,
					width: '100%',
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
					top: '1rem',
					right: '1rem',
					objectFit: 'contain',
					padding: '0.75rem 0rem 0rem 0.5rem',
				}}
				src="https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/space/logo-blogverse-horiz.png?width=300&height=120&resize=contain"
				alt="Blogverse logo"
			/>
		</div>
	);
};

export default PostOgImage;
