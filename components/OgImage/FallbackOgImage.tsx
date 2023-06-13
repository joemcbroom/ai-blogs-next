/* eslint-disable @next/next/no-img-element */
const FallbackOgImage = ({ title }: { title: string }) => {
	return (
		<div
			style={{
				backgroundImage:
					'linear-gradient(rgb(219, 39, 119), rgb(56, 189, 248))',
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
		</div>
	);
};

export default FallbackOgImage;
