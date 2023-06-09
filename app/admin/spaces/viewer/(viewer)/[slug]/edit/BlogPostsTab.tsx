'use client';

// library
import { AbbreviatedPost, Post } from '#/lib/types/inferred.types';

// components
import EditCard from '#/components/UI/admin/EditCard';
import CardsContainer from '#/components/UI/admin/EditCard/CardsContainer';

export default function BlogPostsTab({
	posts,
}: {
	posts: AbbreviatedPost[] | Post[] | null;
}) {
	return (
		<CardsContainer>
			{posts?.map((post) => (
				<div key={post.id} className="flex flex-col">
					<EditCard item={post} />
				</div>
			))}
		</CardsContainer>
	);
}
