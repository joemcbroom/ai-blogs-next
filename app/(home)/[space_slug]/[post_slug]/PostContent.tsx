import ShareLinks from '#/components/UI/ShareLinks';
import type { PostWithSpace } from '#/lib/types/inferred.types';
import React from 'react';
import ContentWithAds from './ContentWithAds';
import Header from '#/components/UI/Header/Header';
import Container from '#/components/UI/containers/Container';

//@ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostContent: React.FC = ({ post }: { post: PostWithSpace }) => {
	const { created_at, title, description, image_path, content, space } = post;
	return (
		<article>
			<Header
				created_at={created_at}
				title={title}
				description={description}
				image_path={image_path || space?.image_path || ''}
				wordCount={content?.split(' ').length || 0}
				spaceSlug={space?.slug || ''}
				spaceTitle={space?.title || ''}
			/>
			{/* <LikesAndComments */}

			<Container type="postContent">
				<ContentWithAds content={content || ''} />
			</Container>
			<section className="mx-auto my-6 flex w-full max-w-4xl items-center justify-between border-y p-6 sm:justify-end sm:space-x-2">
				<span className="text-xs text-neutral-600 dark:text-neutral-200 md:text-base">
					Share this post:
				</span>
				<ShareLinks />
			</section>
		</article>
	);
};

export default PostContent;
