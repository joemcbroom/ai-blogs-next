import Header from '#/components/UI/Header';
import PostCard from '#/components/UI/cards/PostCard';
import { BlogSpace, PostWithSpace } from '#/lib/types/inferred.types';

interface SpaceContentProps {
	space: BlogSpace;
	posts: PostWithSpace[];
}

const SpaceContent: React.FC<SpaceContentProps> = ({ space, posts }) => {
	const { created_at, title, description, image_path } = space;
	return (
		<article>
			<Header
				created_at={created_at}
				title={title}
				description={description}
				image_path={image_path || ''}
				postCount={posts.length}
				showDescription
			/>
			<div className="mx-auto mt-6 grid max-w-4xl gap-4 px-4 md:grid-cols-auto-fit md:px-0">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</article>
	);
};

export default SpaceContent;
