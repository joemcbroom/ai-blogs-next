'use client';

// framework
import { startTransition, useEffect, useMemo, useState } from 'react';

// library
import { Transition } from '@headlessui/react';

// components
import EditCard from '#/components/UI/admin/EditCard';
import CardsContainer from '#/components/UI/admin/EditCard/CardsContainer';
import SelectBox from '#/components/UI/SelectBox';

// types
import type { AbbreviatedPost } from '#/lib/types/inferred.types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ButtonComponent from '#/components/UI/ButtonComponent';
import { supabase } from '#/lib/supabase/client';

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
	const [isBusy, setIsBusy] = useState(false);

	const spaces = useMemo(() => {
		return getSpaces(posts);
	}, [posts]);

	const searchParams = useSearchParams();
	const selectedSpaceIdParam = searchParams.get('selected') || null;

	const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(
		selectedSpaceIdParam
	);

	useEffect(() => {
		if (!posts || !selectedSpaceId) return;
		setShowCards(false);
		setFilteredPosts(
			posts.filter((post) => post.space.id.toString() === selectedSpaceId)
		);
		setShowCards(true);
	}, [selectedSpaceId, posts]);

	const router = useRouter();
	const currentPathname = usePathname();

	const removeQueryParams = () => {
		router.replace(currentPathname);
	};

	const publishOrUnpublishAll = async ({
		type,
	}: {
		type: 'publish' | 'unpublish';
	}) => {
		setIsBusy(true);
		const { error } = await supabase
			.from('post')
			.update({ is_published: type === 'publish' ? true : false })
			.eq('is_published', type === 'publish' ? false : true);

		if (error) throw error;

		setIsBusy(false);

		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<>
			<div
				className={`flex items-center justify-between gap-2 ${
					isBusy ? 'animate-pulse' : ''
				}`}
			>
				<SelectBox
					options={spaces.map((space) => ({
						id: space.id.toString(),
						value: space.title,
					}))}
					changeHandler={(id) => {
						setSelectedSpaceId(id);
						removeQueryParams();
					}}
					widthClass="w-1/6 mr-auto"
					defaultSelectedId={selectedSpaceId || undefined}
				/>
				<ButtonComponent
					type="button"
					onClick={() => publishOrUnpublishAll({ type: 'publish' })}
					buttonStyle="primary"
				>
					Publish All
				</ButtonComponent>
				<ButtonComponent
					type="button"
					onClick={() => publishOrUnpublishAll({ type: 'unpublish' })}
					buttonStyle="danger"
				>
					Unpublish All
				</ButtonComponent>
			</div>
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
