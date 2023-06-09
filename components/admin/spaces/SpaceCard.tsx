'use client';
import Modal from '#/components/UI/Modal';
import supabase from '#/lib/supabase';
// types
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
// utils
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';
import formatNumberString from '#/lib/utils/formatNumberString';

// library
import { PauseIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/solid';

// framework
import { useEffect, useState } from 'react';

// components
import AdminButton from '../AdminButton';

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
	const [editedText, setEditedText] = useState('');
	const { name, slug, created_at, updated_at, is_published } = space;
	const postCount = space.posts.length;

	useEffect(() => {
		const time = updated_at ? updated_at : created_at;
		const timeAgo = formatDistanceToNow(new Date(time));
		const editedText = updated_at ? 'Edited' : 'Created';
		setEditedText(`${editedText} ${timeAgo}`);
	}, [updated_at, created_at]);

	return (
		<div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-400 p-6">
			<div className="">
				<h3 className="text-2xl font-semibold">{name}</h3>
				<p className="mt-2 text-sm italic text-slate-400">{editedText}</p>
				<p>
					{formatNumberString(postCount)} post{postCount === 1 ? '' : 's'}
				</p>
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
