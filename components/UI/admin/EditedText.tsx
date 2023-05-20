import React, { useMemo } from 'react';
import {
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
	AbbreviatedPost,
	Post,
} from '#/lib/types/inferred.types';
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';

interface Props {
	spaceOrPost:
		| BlogSpaceWithAbbreviatedPosts
		| BlogSpaceWithPosts
		| AbbreviatedPost
		| Post;
}

const EditedText: React.FC<Props> = ({ spaceOrPost }) => {
	const { created_at, updated_at } = spaceOrPost;

	const editedText = useMemo(() => {
		const time = updated_at ? updated_at : created_at;
		const timeAgo = formatDistanceToNow(new Date(time));
		const editedText = updated_at ? 'Edited' : 'Created';
		return `${editedText} ${timeAgo}`;
	}, [updated_at, created_at]);

	return <span>{editedText}</span>;
};

export default EditedText;
