import ShareLinks from '#/components/UI/ShareLinks';
import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import React from 'react';
import ContentWithAds from './ContentWithAds';
import PostHeaderImage from '#/components/UI/PostHeaderImage';
import Header from '#/components/UI/Header';

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
