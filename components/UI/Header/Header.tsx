import { SITE_INFO } from '#/lib/constants/siteInfo';
import { supabase } from '#/lib/supabase/static';
import Link from 'next/link';
import PostHeaderImage from '../PostHeaderImage';
import HeaderWrapper from './HeaderWrapper';

interface HeaderProps {
	created_at?: string;
	updated_at?: string;
	title: string;
	description?: string | React.ReactNode;
	image_path?: string;
	wordCount?: number;
	postCount?: number;
	showDescription?: boolean;
	variant?: 'home' | 'post' | 'about';
	spaceSlug?: string;
	spaceTitle?: string;
}

const Header: React.FC<HeaderProps> = ({
	created_at = '',
	title,
	image_path,
	wordCount,
	description,
	postCount,
	showDescription = false,
	variant = 'post',
	spaceSlug,
	spaceTitle,
}) => {
	const isHomeVariant = variant === 'home';
	const isAboutVariant = variant === 'about';
	let src = '';
	if (image_path) {
		const { data } = supabase.storage
			.from('blogverse-public')
			.getPublicUrl(image_path || '');
		src = data?.publicUrl || '';
	}

	// 7 February 2023
	const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const removeQuotes = (str: string) => str.replace(/"/g, '');

	const headerHeight = isHomeVariant ? 'h-80' : 'h-64 md:h-80';
	const h1Class = isHomeVariant
		? '[word-spacing:100vw] md:[word-spacing:unset] text-white text-6xl font-extrabold w-3/4 md:w-1/4'
		: 'text-xl font-bold text-white md:text-3xl';

	// 10 min read
	const readTime = wordCount ? Math.floor(wordCount / 200) : null;
	return (
		<header
			className={`relative flex flex-col items-center justify-end ${headerHeight}`}
		>
			{/* @ts-expect-error */}
			<PostHeaderImage path={image_path || ''} alt={title} />
			<HeaderWrapper>
				{!isHomeVariant && !isAboutVariant && (
					<div className="flex gap-2 text-sm font-semibold text-white">
						<span>{formattedDate}</span>
						{readTime && (
							<>
								<span>・</span>
								<span>{readTime} min read</span>
							</>
						)}
						{postCount && (
							<>
								<span>・</span>
								<span>{postCount} posts</span>
							</>
						)}
						{spaceSlug && (
							<>
								<span>・</span>
								<Link className="hover:underline" href={`/${spaceSlug}`}>
									{spaceTitle}
								</Link>
							</>
						)}
					</div>
				)}
				<h1 className={h1Class}>{title}</h1>
				{showDescription && (
					<p className="text-sm font-semibold text-white">
						{typeof description === 'string'
							? removeQuotes(description || '')
							: description}
					</p>
				)}
				{isHomeVariant && (
					<p className="text-lg text-white">{SITE_INFO.tagLine}</p>
				)}
			</HeaderWrapper>
		</header>
	);
};

export default Header;
