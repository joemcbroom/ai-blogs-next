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
	spaceId,
}: {
	posts: AbbreviatedPost[] | Post[] | null;
	spaceId: string | number;
}) {
	return (
		<>
			{posts?.length ? (
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
			) : (
				<>
					<Link href="/admin/posts/new">
						<span className="mt-6 text-pink-600">
							Generate new posts
							<ArrowLongRightIcon className="inline-block h-5 w-5" />
						</span>
					</Link>
					<div>No posts yet</div>
				</>
			)}
		</>
	);
}
