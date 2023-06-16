import { SITE_INFO } from '#/lib/constants/siteInfo';
import { supabase } from '#/lib/supabase/static';
import PostHeaderImage from '../PostHeaderImage';
import HeaderWrapper from './HeaderWrapper';

interface HeaderProps {
	created_at?: string;
	updated_at?: string | null;
	title: string;
	description: string | null;
	image_path: string | null;
	wordCount?: number;
	postCount?: number;
	showDescription?: boolean;
	variant?: 'home' | 'post';
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
}) => {
	const isHomeVariant = variant === 'home';
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
		? 'text-white text-7xl font-black w-3/4 sm:w-1/2'
		: 'text-xl font-bold text-white md:text-3xl';

	// 10 min read
	const readTime = wordCount ? Math.floor(wordCount / 200) : null;
	return (
		<header
			className={`relative flex flex-col items-center justify-end ${headerHeight}`}
		>
			<PostHeaderImage path={image_path || ''} alt={title} />
			<HeaderWrapper>
				{!isHomeVariant && (
					<div className="flex gap-2 text-sm font-semibold text-white">
						<span>{formattedDate}</span>
						<span>・</span>
						{readTime && <span>{readTime} min read</span>}
						{postCount && <span>{postCount} posts</span>}
					</div>
				)}
				<h1 className={h1Class}>{title}</h1>
				{showDescription && (
					<p className="text-sm font-semibold text-white">
						{removeQuotes(description || '')}
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
