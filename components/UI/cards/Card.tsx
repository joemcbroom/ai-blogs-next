/* eslint-disable @next/next/no-img-element */
import { supabase } from '#/lib/supabase/static';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import CardLink from './CardLink';

interface CardProps {
	title: string;
	description?: string | null;
	image_path: string;
	variant?: 'normal' | 'featured';
	isSpace?: boolean;
	url: string;
	slug: string;
}
const Card = ({
	title,
	description,
	image_path = '',
	url,
	variant,
	slug,
	isSpace = false,
}: CardProps) => {
	const { data: src } = supabase.storage
		.from('blogverse-public')
		.getPublicUrl(image_path, {
			transform: {
				width: 368,
				height: 460,
				resize: 'cover',
			},
		});

	return (
		<div
			className="relative flex min-h-[375px] flex-col items-start justify-end gap-2 overflow-hidden rounded-2xl bg-white p-4 shadow-xl"
			id={slug}
		>
			<img
				className="absolute inset-0 z-0 h-full w-full scale-100 object-cover transition-transform duration-1000 "
				src={src.publicUrl || ''}
				alt={title}
				loading="lazy"
			/>
			<span className="absolute inset-0 z-0 bg-gradient-to-t from-neutral-900 to-transparent dark:from-purple-700 "></span>
			<div className="card-text relative w-full opacity-100 transition-opacity duration-500">
				<h3 className="text-base font-bold text-white">{title}</h3>
				{description && (
					<p className="mt-4 text-center text-xs leading-6 text-neutral-200">
						{description}
					</p>
				)}
			</div>
			<CardLink href={url} slug={slug} isSpace={isSpace} />
		</div>
	);
};

export default Card;
