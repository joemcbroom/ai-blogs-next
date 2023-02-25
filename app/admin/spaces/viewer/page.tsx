'use client';
// components
import AdminHeading from '#/components/admin/AdminHeading';
import SpaceCard from '#/components/admin/spaces/SpaceCard';
import Loader from '#/components/UI/Loader';
import SearchInput from '#/components/UI/SearchInput';
import supabase from '#/lib/supabase';

// framework
import { useEffect, useState } from 'react';

const getAllSpaces = async () => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`);
	if (error) throw error;
	return data;
};

export default function SpacesPage() {
	const [spaces, setSpaces] = useState<SpaceType[]>([]);
	const [filteredSpaces, setFilteredSpaces] = useState<SpaceType[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [spacesLoading, setSpacesLoading] = useState(true);

	useEffect(() => {
		getAllSpaces().then((data) => {
			setSpaces(data);
			setSpacesLoading(false);
		});
	}, []);

	useEffect(() => {
		return searchQuery
			? setFilteredSpaces(
					spaces.filter((space) =>
						space.name.toLowerCase().includes(searchQuery.toLowerCase())
					)
			  )
			: setFilteredSpaces(spaces);
	}, [searchQuery, spaces]);

	return (
		<>
			<AdminHeading
				title="Space Viewer"
				subtitle="Select the Space you wish to edit"
			/>
			<SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			{spacesLoading ? (
				<Loader />
			) : (
				<div className="mt-8 flex flex-col">
					{filteredSpaces.map((space) => (
						<SpaceCard space={space} key={space.slug} />
					))}
				</div>
			)}
		</>
	);
}
