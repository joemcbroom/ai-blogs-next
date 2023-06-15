/* eslint-disable @next/next/no-img-element */
import HeaderWrapper from '#/components/UI/Header/HeaderWrapper';
import LoadingEditCard from '#/components/UI/loaders/LoadingEditCard';
import { supabase } from '#/lib/supabase/static';

export default function Loading() {
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
		<article>
			<header className="relative flex h-64 flex-col items-center justify-end md:h-80">
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
			<div className="mx-auto mt-6 grid max-w-4xl gap-4 px-4 md:grid-cols-auto-fit md:px-0">
				{/* gray bars of various widths | skeleton loader */}
				<span className="h-4 w-40 rounded bg-gray-300" />
				<span className="h-4 w-40 rounded bg-gray-300" />
				<span className="h-4 w-60 rounded bg-gray-300" />
				<span className="h-4 w-40 rounded bg-gray-300" />
				<span className="h-4 w-80 rounded bg-gray-300" />
				<span className="h-4 w-80 rounded bg-gray-300" />
				<span className="h-4 w-40 rounded bg-gray-300" />
				<span className="h-4 w-60 rounded bg-gray-300" />
				<span className="h-4 w-40 rounded bg-gray-300" />
			</div>
		</article>
	);
}
