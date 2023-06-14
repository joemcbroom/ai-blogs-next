import ShareLinks from '#/components/UI/ShareLinks';
import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import React from 'react';
import ContentWithAds from './ContentWithAds';
import PostHeaderImage from '#/components/UI/PostHeaderImage';

interface HeaderProps {
	created_at: string;
	updated_at?: string | null;
	title: string;
	description: string | null;
	image_path: string | null;
	wordCount: number;
}

const Header: React.FC<HeaderProps> = ({
	created_at,
	title,
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
	return (
		<header className="relative flex h-64 flex-col items-center justify-end bg-black bg-opacity-50 md:h-80">
			<PostHeaderImage path={image_path || ''} alt={title} />
			<div className="z-10 flex h-full w-full flex-col justify-end">
				<div className="w-full bg-gradient-to-b from-transparent to-black to-90%">
					<div className="relative mx-auto flex w-full flex-col justify-center gap-2 overflow-hidden p-6 md:max-w-4xl md:px-0">
						<div className="flex gap-2 text-sm font-semibold text-white">
							<span>{formattedDate}</span>
							<span>・</span>
							<span>{readTime} min read</span>
						</div>
						<h1 className="text-xl font-bold text-white md:text-3xl">
							{title}
						</h1>
						{/* {description && (
							<p className="text-xl font-semibold text-white">{description}</p>
						)} */}
					</div>
				</div>
			</div>
		</header>
	);
};

//@ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostContent: React.FC<Post> = ({ post }) => {
	const { created_at, title, description, image_path, content, space } = post;
	return (
		<article>
			<Header
				created_at={created_at}
				title={title}
				description={description}
				image_path={image_path || space?.image_path || ''}
				wordCount={content?.split(' ').length || 0}
			/>
			{/* <LikesAndComments */}

			<section className="ProseMirror mx-auto max-w-4xl p-6 md:p-0 md:pt-6">
				<ContentWithAds content={content} />
			</section>
			<section className="mx-auto my-6 flex w-full max-w-4xl items-center justify-between border-y p-6 sm:justify-end sm:space-x-2">
				<span className="text-neutral-600">Share this post:</span>
				<ShareLinks />
			</section>
		</article>
	);
};

export default PostContent;
