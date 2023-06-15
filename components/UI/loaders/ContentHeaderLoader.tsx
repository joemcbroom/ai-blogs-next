import { supabase } from '#/lib/supabase/static';
import HeaderWrapper from '../Header/HeaderWrapper';

/* eslint-disable @next/next/no-img-element */
const ContentHeaderLoader = () => {
	const { data: placeHolderSrc } = supabase.storage
		.from('blogverse-public')
		.getPublicUrl('post/space-background.jpg', {
			transform: {
				width: 10,
				height: 10,
				resize: 'cover',
			},
		});

	return (
		<header className="relative flex h-64 animate-pulse flex-col items-center justify-end md:h-80">
			<img
				src={placeHolderSrc?.publicUrl}
				alt="Loading..."
				className="absolute left-0 top-0 z-0 h-full w-screen object-cover"
			/>
			<HeaderWrapper>
				<div className="flex gap-2 text-sm font-semibold text-white">
					<span className="h-4 w-20 rounded bg-gray-300"></span>
				</div>
				<h1 className="text-xl font-bold text-white md:text-3xl">
					<span className="h-6 w-40 rounded bg-gray-300"></span>
				</h1>
				<p className="text-sm font-semibold text-white">
					<span className="h-4 w-40 rounded bg-gray-300"></span>
					<span className="h-4 w-40 rounded bg-gray-300"></span>
				</p>
			</HeaderWrapper>
		</header>
	);
};

export default ContentHeaderLoader;
