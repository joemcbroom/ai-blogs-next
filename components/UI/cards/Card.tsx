import CardLink from './CardLink';
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import Image from 'next/image';

interface CardProps {
	title: string;
	description?: string | null;
	image_path: string;
	variant?: 'normal' | 'featured';
	isSpace?: boolean;
	url: string;
	slug: string;
	spaceTitle?: string;
}
const Card = ({
	title,
	description,
	image_path = '',
	url,
	slug,
	isSpace = false,
	spaceTitle = '',
}: CardProps) => {
	return (
		<div
			className="relative flex min-h-[375px] flex-col items-start justify-end gap-2 overflow-hidden rounded-2xl bg-white p-4 shadow-xl"
			id={slug}
		>
			<Image
				className="absolute inset-0 z-0 h-full w-full scale-100 object-cover transition-transform duration-1000 "
				src={SUPABASE_CONSTANTS.PUBLIC_URL(image_path)}
				alt={title}
				fill={true}
				sizes="(max-width: 640px) 100vw, 640px"
			/>
			{spaceTitle && (
				<div className="absolute left-3 top-3 z-10 rounded-lg bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
					{spaceTitle}
				</div>
			)}
			<span className="absolute inset-0 z-0 bg-gradient-to-t from-neutral-900 to-transparent to-50% dark:from-purple-700 "></span>
			<div className="card-text relative w-full opacity-100 transition-opacity duration-500">
				<h3 className="text-base font-bold text-white">{title}</h3>
				{description && (
					<p className="mt-4 line-clamp-3 text-xs leading-6 text-neutral-200">
						{description}
					</p>
				)}
			</div>
			<CardLink href={url} slug={slug} isSpace={isSpace} title={title} />
		</div>
	);
};

export default Card;
