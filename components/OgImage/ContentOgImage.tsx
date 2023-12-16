import FallbackOgImage from './FallbackOgImage';

/* eslint-disable @next/next/no-img-element */
const PostOrSpace = ({
	backgroundImagePath,
	title,
	description,
}: {
	backgroundImagePath: string | null;
	title: string;
	description?: string | undefined;
}) => {
	if (!backgroundImagePath) return <FallbackOgImage title={title} />;

	const imageSrc =
		'https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/object/public/blogverse-public/' +
		backgroundImagePath +
		'?width=1200&height=600&resize=cover';

	return (
		<div
			tw="w-full h-full flex justify-start items-end relative"
			style={{
				backgroundImage: `url(${imageSrc})`,
				backgroundSize: 'cover',
			}}
		>
			<div
				tw="flex flex-col justify-center items-start w-full h-1/2 px-16 py-6 text-white"
				style={{
					backgroundImage:
						'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0))',
				}}
			>
				<div tw="text-3xl font-bold">{title}</div>
				{description && <div tw="text-lg w-2/3">{description}</div>}
			</div>
			<div tw="absolute top-0 flex justify-end items-center w-full py-4 px-16 bg-white bg-opacity-50">
				<img
					tw="w-1/3"
					style={{
						objectFit: 'contain',
					}}
					src="https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/object/public/blogverse-public/general/logo-blogverse-drk.png"
					alt="Blogverse logo"
				/>
			</div>
		</div>
	);
};

export default PostOrSpace;
