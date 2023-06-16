import ShareLinks from '#/components/UI/ShareLinks';
import type { PostWithSpace } from '#/lib/types/inferred.types';
import React, { Suspense } from 'react';
import ContentWithAds from './ContentWithAds';
import Header from '#/components/UI/Header/Header';
import SimilarPosts from './SimilarPosts';
import CardsLoader from '#/components/UI/loaders/CardsLoader';

//@ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostContent: React.FC = ({ post }: { post: PostWithSpace }) => {
	const { created_at, slug, title, description, image_path, content, space } =
		post;
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
				<ContentWithAds content={content || ''} />
			</section>
			<section className="mx-auto my-6 flex w-full max-w-4xl items-center justify-between border-y p-6 sm:justify-end sm:space-x-2">
				<span className="text-xs text-neutral-600 dark:text-neutral-200 md:text-base">
					Share this post:
				</span>
				<ShareLinks />
			</section>
			<section>
				<Suspense fallback={<CardsLoader />}>
					{/* @ts-expect-error */}
					<SimilarPosts post_slug={post.slug} />
				</Suspense>
			</section>
		</article>
	);
};

export default PostContent;
