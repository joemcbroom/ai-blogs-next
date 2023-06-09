'use client';

import SearchInput from '#/components/UI/SearchInput';
import { BlogSpaceWithAbbreviatedPosts } from '#/lib/types/inferred.types';
import { useEffect, useState } from 'react';
import EditCard from './EditCard';
import CardsContainer from './EditCard/CardsContainer';

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
				space.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
		);
	}, [searchQuery, spaces]);

	return (
		<>
			<SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

			<CardsContainer>
				{filteredSpaces?.map((space) => (
					<EditCard item={space} type="space" key={space.slug} />
				))}
			</CardsContainer>
		</>
	);
}
