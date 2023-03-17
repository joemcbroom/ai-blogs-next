'use client';
import Modal from '#/components/UI/Modal';
import useSpaceEditedText from '#/lib/hooks/useSpaceEditedText';
import supabase from '#/lib/supabase';
// types
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
// utils
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';

// library
import { PauseIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/solid';

// framework
import { useEffect, useState } from 'react';

// components
import AdminButton from '../AdminButton';
import PostsAndSubscribers from './PostsAndSubscribers';

const PauseOrResumeButton = ({
	space,
	className,
}: {
	space: BlogSpaceWithPosts;
	className: string;
}) => {
	const [isPublished, setIsPublished] = useState(space.is_published);
	const [showModal, setShowModal] = useState(false);

	const handlePauseOrResume = async () => {
		setShowModal(true);
	};

	const handleConfirmation = async () => {
		const { error } = await supabase
			.from('blog_space')
			.update({ is_published: !isPublished })
			.eq('id', space.id)
			.select();

		if (error) throw error;
		setIsPublished(!isPublished);
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};

	return (
		<>
			<button
				className={`flex items-center justify-center ${className}`}
				onClick={handlePauseOrResume}
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
			{showModal && (
				<Modal
					title={isPublished ? 'Pause space?' : 'Publish space?'}
					message={
						isPublished
							? 'Are you sure you want to pause this space? Your readers will no longer be able to see its posts.'
							: 'Are you sure you want to publish this space? Your readers will be able to see its posts.'
					}
					onConfirm={handleConfirmation}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
};

const SpaceCard = ({ space }: { space: BlogSpaceWithPosts }) => {
	const { editedText } = useSpaceEditedText(space);
	const { name, slug } = space;
	const postCount = space.posts.length;

	return (
		<div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-400 p-6 md:grid-cols-2">
			<div className="flex flex-col gap-1">
				<h3 className="text-2xl font-semibold">{name}</h3>
				<p className="mt-1 text-sm italic text-slate-400">{editedText}</p>
				<PostsAndSubscribers postCount={postCount} />
			</div>
			<div className="flex flex-1 items-center justify-center gap-4">
				<button className="flex items-center justify-center">
					<TrashIcon className="h-5 w-5 fill-current" />
					<span>Delete</span>
				</button>
				<PauseOrResumeButton className="basis-20" space={space} />
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
