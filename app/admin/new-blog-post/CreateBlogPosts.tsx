'use client';

// framework
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

// library
import { Transition } from '@headlessui/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

// components
import ButtonComponent from '#/components/UI/ButtonComponent';
import SelectBox from '#/components/UI/SelectBox';
import IconLoader from '#/components/UI/loaders/IconLoader';

// lib
import slugify from '#/lib/utils/slugify';
import { createPosts } from '#/lib/supabase/client';
import { useAlert } from '#/lib/hooks/useAlert';

// types
import {
	BlogSpaceWithAbbreviatedPosts,
	PostInsert,
} from '#/lib/types/inferred.types';

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
	const [isPending, startTransition] = useTransition();
	const [isGenerating, setIsGenerating] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const isBusy = isGenerating || isCreating || isPending;
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
			value: space.title,
		}));
	}, [spaces]);

	const generateTitles = async () => {
		if (selectedSpace) {
			setIsGenerating(true);
			const response = await fetch('/api/generate/post_titles', {
				method: 'POST',
				body: JSON.stringify({
					spaceTitle: selectedSpace.title,
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
				space_id: selectedSpace.id,
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
		<div className="grid h-full grid-cols-12">
			<div
				className={`col-span-7 flex max-h-[calc(100vh-220px)] max-w-3xl flex-col overflow-scroll ${
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
					{selectedSpace?.title && (
						<>
							<span>Generate post titles for </span>
							<span className="text-pink-600">{selectedSpace.title}</span>
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
							{ id: '1', value: '1' },
							{ id: '2', value: '2' },
							{ id: '5', value: '5' },
							{ id: '10', value: '10' },
						]}
						changeHandler={setNumberToGenerate}
						widthClass="w-1/3"
					/>
					<span>titles</span>
				</div>
				<ButtonComponent onClick={generateTitles}>
					{isGenerating ? (
						<IconLoader className="h-5 w-5" />
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

			<div className="col-span-5 -mr-16 bg-slate-100 p-6">
				<h3 className="text-lg font-bold">Latest Posts in this Space:</h3>
				{selectedSpace?.posts?.length ? (
					<>
						<ul className="mb-4 list-inside list-disc">
							{selectedSpace?.posts?.map((post) => (
								<li key={post.slug}>{post.title}</li>
							))}
						</ul>
						<Link
							href={`/admin/spaces/viewer/${selectedSpace.slug}/edit?tab=posts`}
						>
							<span className="mt-6 text-pink-600">
								See All <ArrowLongRightIcon className="inline-block h-5 w-5" />
							</span>
						</Link>
					</>
				) : (
					<span className="text-slate-500">
						:/ There are no posts in this space yet
					</span>
				)}
			</div>
		</div>
	);
}
