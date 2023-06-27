import Header from '#/components/UI/Header/Header';
import CardWrapper from '#/components/UI/cards/CardWrapper';
import PostCard from '#/components/UI/cards/PostCard';
import Container from '#/components/UI/containers/Container';
import { BlogSpace, Post, PostWithSpace } from '#/lib/types/inferred.types';

interface SpaceContentProps {
	space: BlogSpace;
	posts: Post[] | [];
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
			<Container>
				<CardWrapper>
					{posts.map((post) => (
						<PostCard key={post.id} post={{ ...post, space }} />
					))}
				</CardWrapper>
			</Container>
		</article>
	);
};

export default SpaceContent;
