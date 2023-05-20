'use client';

// framework
import { useEffect, useState } from 'react';

// components
import EditCard from '#/components/UI/admin/EditCard';
import CardsContainer from '#/components/UI/admin/EditCard/CardsContainer';
import SearchInput from '#/components/UI/SearchInput';

// types
import type { BlogSpaceWithAbbreviatedPosts } from '#/lib/types/inferred.types';

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
					<EditCard item={space} key={space.slug} />
				))}
			</CardsContainer>
		</>
	);
}
