/* eslint-disable @next/next/no-img-element */
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import { supabase } from '#/lib/supabase/client';
import { BlogSpace, Post, PostWithSpace } from '#/lib/types/inferred.types';
import Image from 'next/image';
import Link from 'next/link';

const CardSmall = ({
	image_path,
	title,
}: {
	image_path: string | null;
	title: string;
}) => {
	return (
		<div className="relative flex w-24 flex-col space-y-1 text-xs font-semibold md:w-36 md:text-sm">
			<div className="relative aspect-square w-full overflow-hidden rounded-lg">
				<span className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-900 to-transparent to-40% dark:from-purple-700 "></span>
				<Image
					src={
						image_path
							? SUPABASE_CONSTANTS.PUBLIC_URL(image_path)
							: '/images/abstract-bg.jpg'
					}
					alt=""
					className="absolute inset-0 z-0 aspect-square w-full rounded-lg object-cover"
					fill={true}
					// only 96px wide max
					sizes="(max-width: 96px) 100vw, 96px"
				/>
			</div>
			<span className="line-clamp-1 md:line-clamp-none">{title}</span>
		</div>
	);
};

const ScrollCards = ({ items }: { items: BlogSpace[] | PostWithSpace[] }) => {
	const getHref = (item: BlogSpace | Post) => {
		if ('space' in item) {
			// @ts-expect-error
			return `/${item.space.slug}/${item.slug}`;
		} else {
			return `/${item.slug}`;
		}
	};
	return (
		<div className="scroll-cards relative -mr-4 flex snap-x scroll-px-[50%] scroll-py-0 space-x-3 overflow-x-scroll py-4 pr-16 md:mr-0">
			{items.map((item, index) => (
				<Link
					href={getHref(item)}
					key={index}
					className="mr-1 inline-block snap-center last-of-type:mr-6"
				>
					<CardSmall {...item} />
				</Link>
			))}
		</div>
	);
};

export default ScrollCards;
