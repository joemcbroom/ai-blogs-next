'use client';

// types
import { Post } from '#/lib/types/inferred.types';

interface Props {
	post: Post;
}

const PostEdit: React.FC<Props> = ({ post }) => {
	return <pre>{JSON.stringify(post, null, 2)}</pre>;
};

export default PostEdit;
