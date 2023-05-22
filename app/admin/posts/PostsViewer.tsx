'use client';

// framework
import { useEffect, useMemo, useState } from 'react';

// library
import { Transition } from '@headlessui/react';

// components
import EditCard from '#/components/UI/admin/EditCard';
import CardsContainer from '#/components/UI/admin/EditCard/CardsContainer';
import SelectBox from '#/components/UI/SelectBox';

// types
import type { AbbreviatedPost } from '#/lib/types/inferred.types';

// Reduce posts to an array of spaces like this: [{ title: string, id: number }, ...]
// a space looks like { title: string, id: number }
const getSpaces = (posts: AbbreviatedPost[]) => {
	const spaces = posts.reduce((acc, { space }) => {
		if (!acc.find((accSpace) => accSpace.id === space.id)) {
			acc.push(space);
		}
		return acc;
	}, [] as { id: number; title: string }[]);
	return spaces;
};

export default function PostsViewer({ posts }: { posts: AbbreviatedPost[] }) {
	const [filteredPosts, setFilteredPosts] = useState(posts);
	const [showCards, setShowCards] = useState(false);

	const spaces = useMemo(() => {
		return getSpaces(posts);
	}, [posts]);

	const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);

	useEffect(() => {
		if (!posts || !selectedSpaceId) return;
		setShowCards(false);
		setFilteredPosts(
			posts.filter((post) => post.space.id.toString() === selectedSpaceId)
		);
		setShowCards(true);
	}, [selectedSpaceId, posts]);

	return (
		<>
			{/* <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
			<SelectBox
				options={spaces.map((space) => ({
					id: space.id.toString(),
					value: space.title,
				}))}
				changeHandler={(id) => {
					setSelectedSpaceId(id);
				}}
				widthClass="w-1/6"
			/>
			<Transition
				show={showCards}
				enter="transition-opacity duration-150"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<CardsContainer>
					{selectedSpaceId &&
						filteredPosts?.map((post) => (
							<EditCard item={post} key={post.slug} />
						))}
				</CardsContainer>
			</Transition>
		</>
	);
}
