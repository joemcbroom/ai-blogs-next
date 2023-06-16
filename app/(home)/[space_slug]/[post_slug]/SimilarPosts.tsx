'use client';
import CardWrapper from '#/components/UI/cards/CardWrapper';
import PostCard from '#/components/UI/cards/PostCard';
import { getSimilarPosts } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import { useEffect, useState } from 'react';

const SimilarPosts = async ({ post_slug }: { post_slug: string }) => {
	const [similarPosts, setSimilarPosts] = useState<Partial<Post>[]>([]); // [similarPost, setSimilarPosts

	const init = async () => {
		const res = await fetch(`/api/supabase/similar_posts/${post_slug}`, {
			next: {
				revalidate: 60 * 60,
			},
		});
		const similarPosts = await res.json();
		debugger;
		setSimilarPosts(similarPosts);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-2xl font-bold">Similar Posts</h2>
			<CardWrapper>
				{similarPosts.map((post: Partial<Post>) => (
					// @ts-expect-error
					<PostCard key={post.slug} post={post} />
				))}
			</CardWrapper>
		</div>
	);
};

export default SimilarPosts;
