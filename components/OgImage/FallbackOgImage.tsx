/* eslint-disable @next/next/no-img-element */
const FallbackOgImage = ({ title }: { title: string }) => {
	const size = {
		width: 1200,
		height: 600,
	};
	const bgUrl = `https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/object/public/blogverse-public/general/img-bkg-futureisnow.jpg`;

	return (
		<div
			style={{
				backgroundImage: `url(${bgUrl})`,
				backgroundSize: 'cover',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				alignItems: 'center',
				position: 'relative',
				padding: '0',
				textAlign: 'center',
			}}
		>
			<img
				style={{
					width: '450px',
					height: '150px',
					position: 'absolute',
					top: '2rem',
					right: '4rem',
					objectFit: 'contain',
				}}
				src="https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/object/public/blogverse-public/general/logo-blogverse-drk.png"
				alt="Blogverse logo"
			/>
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
					textTransform: 'capitalize',
				}}
			>
				{title}
			</div>
		</div>
	);
};

export default FallbackOgImage;
