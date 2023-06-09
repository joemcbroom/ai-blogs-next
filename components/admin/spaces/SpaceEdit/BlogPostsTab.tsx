'use client';
import { PartialPost } from '#/lib/types/inferred.types';
import EditCard from '../EditCard';
import CardsContainer from '../EditCard/CardsContainer';

export default function BlogPostsTab({
	posts,
}: {
	posts: PartialPost[] | null;
}) {
	return (
		<CardsContainer>
			{posts?.map((post) => (
				<div key={post.id} className="flex flex-col">
					<EditCard item={post} type="post" />
				</div>
			))}
		</CardsContainer>
	);
}
