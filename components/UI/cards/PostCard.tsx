import type { PostWithSpace } from '#/lib/types/inferred.types';
import Card from './Card';

interface PostCardProps {
	post: PostWithSpace;
	variant?: 'normal' | 'featured';
}

const PostCard = ({ post }: PostCardProps) => {
	return (
		<Card
			{...post}
			image_path={post.image_path || post.space.image_path || ''}
			url={`/${post.space.slug}/${post.slug}`}
		/>
	);
};

export default PostCard;
