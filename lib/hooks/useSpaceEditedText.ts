import { useEffect, useState } from 'react';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';

const useSpaceEditedText = (space: BlogSpaceWithPosts) => {
	const [editedText, setEditedText] = useState('');
	const { created_at, updated_at } = space;

	useEffect(() => {
		const time = updated_at ? updated_at : created_at;
		const timeAgo = formatDistanceToNow(new Date(time));
		const editedText = updated_at ? 'Edited' : 'Created';
		setEditedText(`${editedText} ${timeAgo}`);
	}, [updated_at, created_at]);

	return { editedText };
};

export default useSpaceEditedText;
