'use client';

import LoadingText from '#/components/UI/loaders/LoadingText';
import {
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
} from '#/lib/types/inferred.types';
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';
import { useEffect, useState } from 'react';

const EditedText = ({
	space,
}: {
	space: BlogSpaceWithAbbreviatedPosts | BlogSpaceWithPosts;
}) => {
	const [editedText, setEditedText] = useState('');
	const { created_at, updated_at } = space;

	useEffect(() => {
		const time = updated_at ? updated_at : created_at;
		const timeAgo = formatDistanceToNow(new Date(time));
		const editedText = updated_at ? 'Edited' : 'Created';
		setEditedText(`${editedText} ${timeAgo}`);
	}, [updated_at, created_at]);

	if (!editedText) {
		return <LoadingText startingText="Edited" />;
	}

	return <span>{editedText}</span>;
};

export default EditedText;
