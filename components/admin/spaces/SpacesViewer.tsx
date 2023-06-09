'use client';

import SearchInput from '#/components/UI/SearchInput';
import { BlogSpaceWithAbbreviatedPosts } from '#/lib/types/inferred.types';
import { useEffect, useState } from 'react';
import SpaceCard from './SpaceCard';

export default function SpacesViewer({
	spaces,
}: {
	spaces: BlogSpaceWithAbbreviatedPosts[];
}) {
	const [filteredSpaces, setFilteredSpaces] = useState(spaces);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		if (!spaces) return;
		setFilteredSpaces(
			spaces.filter((space) =>
				space.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		);
	}, [searchQuery, spaces]);

	return (
		<>
			<SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

			<div className="mt-8 flex max-w-5xl flex-col gap-4">
				{filteredSpaces?.map((space) => (
					<SpaceCard space={space} key={space.slug} />
				))}
			</div>
		</>
	);
}
