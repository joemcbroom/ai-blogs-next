'use client';

import ButtonComponent from '#/components/UI/ButtonComponent';
import SelectBox from '#/components/UI/SelectBox';
import IconLoader from '#/components/UI/loaders/IconLoader';
import { useAlert } from '#/lib/hooks/useAlert';
import { createPosts } from '#/lib/supabase/client';
import {
	BlogSpaceWithAbbreviatedPosts,
	PostInsert,
} from '#/lib/types/inferred.types';
import slugify from '#/lib/utils/slugify';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useMemo, useState } from 'react';

type Title = {
	content: string;
	include: boolean;
};

export default function CreateBlogPosts({
	spaces,
}: {
	spaces: BlogSpaceWithAbbreviatedPosts[];
}) {
	const [selectedSpaceId, setSelectedSpaceId] = useState<string>();
	const [selectedSpace, setSelectedSpace] =
		useState<BlogSpaceWithAbbreviatedPosts>();
	const [numberToGenerate, setNumberToGenerate] = useState<string>('1');
	const [generatedTitles, setGeneratedTitles] = useState<Title[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const isBusy = isGenerating || isCreating;
	const { showAlert } = useAlert();
	const router = useRouter();

	useEffect(() => {
		if (selectedSpaceId) {
			const selectedSpace = spaces.find(
				(space) => space.id.toString() === selectedSpaceId
			);
			if (selectedSpace) {
				setSelectedSpace(selectedSpace);
			}
		}
	}, [selectedSpaceId, spaces]);

	const selectOptions = useMemo(() => {
		return spaces.map((space) => ({
			id: space.id.toString(),
			name: space.name,
		}));
	}, [spaces]);

	const generateTitles = async () => {
		if (selectedSpace) {
			setIsGenerating(true);
			const response = await fetch('/api/generate/post_titles', {
				method: 'POST',
				body: JSON.stringify({
					spaceName: selectedSpace.name,
					spaceDescription: selectedSpace.description,
					numberToGenerate: parseInt(numberToGenerate),
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const { titles } = await response.json();
			// append the titles to the titles state
			const newTitles = titles.map((title: string) => ({
				content: title,
				include: true,
			})) as Title[];
			setGeneratedTitles([...generatedTitles, ...newTitles]);
			setIsGenerating(false);
		}
	};

	const handleCreatePosts = async () => {
		const selectedTitles = generatedTitles.filter((title) => title.include);
		if (selectedSpace && selectedTitles.length > 0) {
			setIsCreating(true);
			const posts: PostInsert[] = selectedTitles.map((title) => ({
				title: title.content,
				blog_space_id: selectedSpace.id,
				slug: slugify(title.content),
				is_published: false,
			}));
			await createPosts(posts);
			setGeneratedTitles([]);
			showAlert({
				type: 'success',
				message: `Successfully created ${posts.length} posts`,
			});
			startTransition(() => {
				router.refresh();
				setIsCreating(false);
			});
		}
	};

	const formatTitlesString = () => `title${+numberToGenerate > 1 ? 's' : ''}`;

	return (
		<div className="grid grid-cols-2">
			<div
				className={`flex max-w-3xl flex-col ${
					isBusy ? 'pointer-events-none animate-pulse' : ''
				}`}
			>
				<SelectBox
					options={selectOptions}
					changeHandler={setSelectedSpaceId}
					disabled={generatedTitles.length > 0}
					widthClass="w-1/2"
				/>
				<h2 className="mt-4 text-2xl font-bold">
					{selectedSpace?.name && (
						<>
							<span>Generate post titles for </span>
							<span className="text-pink-600">{selectedSpace.name}</span>
						</>
					)}
				</h2>
				<span className="my-2">
					AI will generate {formatTitlesString()} for possible posts
				</span>
				<div className="mb-3 flex w-1/2 items-center gap-2">
					<span>Create</span>
					<SelectBox
						options={[
							{ id: '1', name: '1' },
							{ id: '2', name: '2' },
							{ id: '5', name: '5' },
							{ id: '10', name: '10' },
						]}
						changeHandler={setNumberToGenerate}
						widthClass="w-1/3"
					/>
					<span>titles</span>
				</div>
				<ButtonComponent onClick={generateTitles} additionalClasses="w-1/3">
					{isGenerating ? (
						<IconLoader className="h-4 w-4" />
					) : (
						<span className="text-sm">Generate {formatTitlesString()}</span>
					)}
				</ButtonComponent>
				<Transition
					show={generatedTitles.length > 0}
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="my-4 font-bold">
						{generatedTitles.map(({ content, include }) => (
							<div key={content} className="mb-2">
								<span>{content}</span>
								<input
									type="checkbox"
									className="ml-2"
									checked={include}
									onChange={() => {
										setGeneratedTitles((prev) =>
											prev.map((prevTitle) => {
												if (prevTitle.content === content) {
													return {
														...prevTitle,
														include: !prevTitle.include,
													};
												}
												return prevTitle;
											})
										);
									}}
								/>
							</div>
						))}
						<ButtonComponent onClick={handleCreatePosts}>
							Save Posts
						</ButtonComponent>
					</div>
				</Transition>
			</div>

			{selectedSpace && (
				<div>
					<h3 className="text-lg font-bold">{selectedSpace.name} Posts:</h3>
					<ul className="list-inside list-none">
						{selectedSpace?.posts?.map((post) => (
							<li key={post.slug}>{post.title}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
