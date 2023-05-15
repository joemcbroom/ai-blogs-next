import React, { useMemo } from 'react';
import {
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
} from '#/lib/types/inferred.types';
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';

const EditedText = ({
	space,
}: {
	space: BlogSpaceWithAbbreviatedPosts | BlogSpaceWithPosts;
}) => {
	const { created_at, updated_at } = space;

	const editedText = useMemo(() => {
		const time = updated_at ? updated_at : created_at;
		const timeAgo = formatDistanceToNow(new Date(time));
		const editedText = updated_at ? 'Edited' : 'Created';
		return `${editedText} ${timeAgo}`;
	}, [updated_at, created_at]);

	return <span>{editedText}</span>;
};

export default EditedText;
