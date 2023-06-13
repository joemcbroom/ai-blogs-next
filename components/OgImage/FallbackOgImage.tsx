/* eslint-disable @next/next/no-img-element */
const FallbackOgImage = ({ title }: { title: string }) => {
	return (
		<div
			style={{
				backgroundColor: 'black',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
				alignItems: 'center',
				position: 'relative',
				padding: '5rem 0',
			}}
		>
			<img
				style={{
					backgroundColor: 'rgba(255, 255, 255, 1)',
					borderRadius: '1rem',
					width: '400px',
					height: '120px',
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
					backgroundColor: 'black',
					padding: '3rem',
					fontSize: 48,
					fontWeight: 600,
					width: '100%',
				}}
			>
				{title}
			</div>
		</div>
	);
};

export default FallbackOgImage;
