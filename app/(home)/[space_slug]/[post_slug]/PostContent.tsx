import ResponsiveImage from '#/components/UI/ResponsiveImage';
import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';

interface HeaderImageProps {
	created_at: string;
	updated_at?: string | null;
	title: string;
	description: string | null;
	image_path: string | null;
	wordCount: number;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
	created_at,
	updated_at,
	title,
	description,
	image_path,
	wordCount,
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

	// 10 min read
	const readTime = Math.floor(wordCount / 200);
	const width = 1200;
	const height = 900;
	return (
		<header className="relative flex flex-col items-center justify-end bg-black bg-opacity-50">
			<ResponsiveImage
				src={src}
				width={width}
				height={height}
				alt={title}
				className="absolute left-0 top-0 z-0 h-96 w-screen bg-black bg-opacity-50 object-cover"
			/>
			<div className="z-10 flex h-96 w-full flex-col justify-end">
				<div className="w-full bg-black bg-opacity-30">
					<div className="relative mx-auto flex w-full flex-col justify-center gap-2 overflow-hidden p-6 md:max-w-4xl md:px-0">
						<div className="flex gap-2 text-sm font-semibold text-white">
							<span>{formattedDate}</span>
							<span>・</span>
							<span>{readTime} min read</span>
						</div>
						<h1 className="text-3xl font-bold text-white">{title}</h1>
						{description && (
							<p className="text-xl font-semibold text-white">{description}</p>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

//@ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostContent: React.FC<Post> = ({ post }) => {
	const { created_at, updated_at, title, description, image_path, content } =
		post;
	const removeDuplicateTitle = (content: string) => {
		// title is html so we should remove the title and surrounding tags
		const titleRegex = /<h1.*?>(.*?)<\/h1>/;
		const titleMatch = content.match(titleRegex);
		if (titleMatch) {
			const title = titleMatch[0];
			return content.replace(title, '');
		}
		return content;
	};
	return (
		<article className="">
			<HeaderImage
				created_at={created_at}
				title={title}
				description={description}
				image_path={image_path}
				wordCount={content?.split(' ').length || 0}
			/>
			{/* <LikesAndComments */}
			<section
				className="ProseMirror mx-auto max-w-4xl p-6 md:p-0 md:pt-6"
				dangerouslySetInnerHTML={{
					__html: removeDuplicateTitle(post.content || '<p>no content yet</p>'),
				}}
			/>
		</article>
	);
};

export default PostContent;
