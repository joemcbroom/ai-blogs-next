'use client';
// lib
import useSpaceEditedText from '#/lib/hooks/useSpaceEditedText';
import supabase from '#/lib/requestHelpers/supabase-client';
// types
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';

// library
import { PauseIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

// framework
import { useState, useTransition } from 'react';

// components
import AdminButton from '#/components/admin/AdminButton';
import PostsAndSubscribers from '#/components/admin/spaces/PostsAndSubscribers';
import Modal from '#/components/UI/Modal';

const PauseOrResumeButton = ({
	isPublished,
	className,
	handlePauseOrResume,
}: {
	isPublished: boolean;
	className: string;
	handlePauseOrResume: () => void;
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				className={`flex items-center justify-center ${className}`}
				onClick={() => setShowModal(true)}
			>
				{isPublished ? (
					<>
						<PauseIcon className="mr-1 h-5 w-5 fill-current" />
						<span>Pause</span>
					</>
				) : (
					<>
						<PlayIcon className="mr-1 h-5 w-5 fill-current" />
						<span>Publish</span>
					</>
				)}
			</button>

			<Modal
				showModal={showModal}
				title={isPublished ? 'Pause space?' : 'Publish space?'}
				message={
					isPublished
						? 'Are you sure you want to pause this space? Your readers will no longer be able to see its posts.'
						: 'Are you sure you want to publish this space? Your readers will be able to see its posts.'
				}
				onConfirm={() => {
					setShowModal(false);
					handlePauseOrResume();
				}}
				onCancel={() => setShowModal(false)}
			/>
		</>
	);
};

const DeleteButton = ({
	handleDelete,
}: {
	space: BlogSpaceWithPosts;
	handleDelete: () => void;
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				className="flex items-center justify-center"
				onClick={() => setShowModal(true)}
			>
				<TrashIcon className="h-5 w-5 fill-current" />
				<span>Delete</span>
			</button>

			<Modal
				showModal={showModal}
				title="Delete space?"
				message="Are you sure you want to delete this space? This action cannot be undone."
				onConfirm={() => {
					setShowModal(false);
					handleDelete();
				}}
				onCancel={() => setShowModal(false)}
			/>
		</>
	);
};

const SpaceCard = ({ space }: { space: BlogSpaceWithPosts }) => {
	const { editedText } = useSpaceEditedText(space);
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const router = useRouter();

	const isMutating = isFetching || isPending;

	const { name, slug } = space;
	const postCount = space.posts.length;

	const handleDelete = async () => {
		setIsFetching(true);

		const { error } = await supabase
			.from('blog_space')
			.delete()
			.eq('id', space.id);

		if (error) throw error;

		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	const handlePauseOrResume = async () => {
		setIsFetching(true);

		const { error } = await supabase
			.from('blog_space')
			.update({ is_published: !space.is_published })
			.eq('id', space.id)
			.select();

		if (error) throw error;

		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<div
			className={`grid grid-cols-1 gap-4 rounded-lg border border-slate-400 p-6 md:grid-cols-2 ${
				isMutating ? 'animate-pulse' : ''
			}`}
		>
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2 transition-all">
					{!space.is_published && (
						<PauseIcon className="h-5 w-5 fill-current text-pink-600" />
					)}
					<h3 className="text-2xl font-semibold">{name}</h3>
					{!space.is_published && (
						<span className="text-sm text-pink-600">PAUSED</span>
					)}
				</div>
				<p className="mt-1 text-sm italic text-slate-400">{editedText}</p>
				<PostsAndSubscribers postCount={postCount} />
			</div>
			<div className="flex flex-1 items-center justify-end gap-4">
				<DeleteButton space={space} handleDelete={handleDelete} />
				<PauseOrResumeButton
					className="basis-20"
					isPublished={space.is_published}
					handlePauseOrResume={handlePauseOrResume}
				/>
				<AdminButton
					backgroundClass="bg-pink-600"
					href={`/admin/spaces/viewer/${slug}/edit`}
				>
					Edit Space
				</AdminButton>
			</div>
		</div>
	);
};

export default SpaceCard;
