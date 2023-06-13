/* eslint-disable @next/next/no-img-element */
const FallbackOgImage = ({ title }: { title: string }) => {
	return (
		<div
			style={{
				backgroundImage:
					'radial-gradient(rgba(238,174,202,1), rgba(148,187,233,1))',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
				alignItems: 'center',
				position: 'relative',
				padding: '7rem 3rem',
				textAlign: 'center',
			}}
		>
			<img
				style={{
					width: '400px',
					height: '120px',
					objectFit: 'contain',
				}}
				src="https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/space/logo-blogverse-horiz.png?width=300&height=120&resize=contain"
				alt="Blogverse logo"
			/>
			<div
				style={{
					color: 'black',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					fontSize: 48,
					fontWeight: 600,
					width: '100%',
					textTransform: 'capitalize',
				}}
			>
				{title}
			</div>
		</div>
	);
};

export default FallbackOgImage;
