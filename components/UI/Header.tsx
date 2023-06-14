import { supabase } from '#/lib/supabase/static';
import PostHeaderImage from './PostHeaderImage';

interface HeaderProps {
	created_at: string;
	updated_at?: string | null;
	title: string;
	description: string | null;
	image_path: string | null;
	wordCount?: number;
	postCount?: number;
	showDescription?: boolean;
}

const Header: React.FC<HeaderProps> = ({
	created_at,
	title,
	image_path,
	wordCount,
	description,
	postCount,
	showDescription = false,
}) => {
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

	// 10 min read
	const readTime = wordCount ? Math.floor(wordCount / 200) : null;
	return (
		<header className="relative flex h-64 flex-col items-center justify-end md:h-80">
			<PostHeaderImage path={image_path || ''} alt={title} />
			<div className="z-10 flex h-full w-full flex-col justify-end">
				<div className="w-full bg-gradient-to-b from-transparent to-black to-90%">
					<div className="relative mx-auto flex w-full flex-col justify-center gap-2 overflow-hidden p-6 md:max-w-4xl md:px-0">
						<div className="flex gap-2 text-sm font-semibold text-white">
							<span>{formattedDate}</span>
							<span>・</span>
							{readTime && <span>{readTime} min read</span>}
							{postCount && <span>{postCount} posts</span>}
						</div>
						<h1 className="text-xl font-bold text-white md:text-3xl">
							{title}
						</h1>
						{showDescription && (
							<p className="text-sm font-semibold text-white">
								{removeQuotes(description || '')}
							</p>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
