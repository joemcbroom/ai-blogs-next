'use client';

// library
import { AbbreviatedPost, Post } from '#/lib/types/inferred.types';

// components
import EditCard from '#/components/UI/admin/EditCard';
import CardsContainer from '#/components/UI/admin/EditCard/CardsContainer';
import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

export default function BlogPostsTab({
	posts,
}: {
	posts: AbbreviatedPost[] | Post[] | null;
}) {
	const spaceId = posts?.[0]?.space_id;

	if (!posts || !spaceId) return <span>No posts found</span>;

	return (
		<>
			<Link href={`/admin/posts/?selected=${spaceId}`}>
				<span className="mt-6 text-pink-600">
					See All <ArrowLongRightIcon className="inline-block h-5 w-5" />
				</span>
			</Link>
			<CardsContainer>
				{posts?.map((post) => (
					<div key={post.id} className="flex flex-col">
						<EditCard item={post} />
					</div>
				))}
			</CardsContainer>
		</>
	);
}
