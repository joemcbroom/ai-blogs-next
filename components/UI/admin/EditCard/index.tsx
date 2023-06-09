'use client';

// components
import ButtonComponent from '#/components/UI/ButtonComponent';
import EditedText from '../EditedText';
import { PauseIcon } from '@heroicons/react/24/solid';
import PostsAndSubscribers from './PostsAndSubscribers';
import ActionButton from './ActionButton';

// lib
import { supabase } from '#/lib/supabase/client';

// framework
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';

// types
import {
	BlogSpaceWithAbbreviatedPosts,
	BlogSpaceWithPosts,
	AbbreviatedPost,
	Post,
} from '#/lib/types/inferred.types';

const itemIsBlogSpace = (
	item:
		| BlogSpaceWithAbbreviatedPosts
		| BlogSpaceWithPosts
		| AbbreviatedPost
		| Post
): item is BlogSpaceWithAbbreviatedPosts | BlogSpaceWithPosts =>
	(item as BlogSpaceWithAbbreviatedPosts | BlogSpaceWithPosts).posts !==
	undefined;

interface Props {
	item:
		| BlogSpaceWithAbbreviatedPosts
		| BlogSpaceWithPosts
		| AbbreviatedPost
		| Post;
}

const EditCard: React.FC<Props> = ({ item }) => {
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const router = useRouter();
	const type = itemIsBlogSpace(item) ? 'space' : 'post';

	const isMutating = isFetching || isPending;

	const { slug, title, id, is_published } = item;
	const postCount = (itemIsBlogSpace(item) && item?.posts?.length) || null;

	const handleDelete = async () => {
		setIsFetching(true);

		await fetch(`/api/supabase/${type}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ slug }),
		});

		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	const handlePublishOrUnpublish = async () => {
		setIsFetching(true);

		await fetch(`/api/supabase/${type}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ slug, data: { is_published: !is_published } }),
		});

		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<div
			className={`grid grid-cols-1 gap-4 rounded-lg border border-slate-400 p-6 md:grid-cols-12 ${
				isMutating ? 'animate-pulse' : ''
			}`}
		>
			<div className="col-span-7 flex flex-col gap-1">
				<div className="flex items-center gap-2 transition-all">
					{!is_published && (
						<PauseIcon className="h-8 w-8 self-start fill-current text-pink-600" />
					)}
					<h3 className="text-2xl font-semibold">{title}</h3>
				</div>
				<p className="mr-auto mt-1 flex text-sm italic text-slate-400">
					<EditedText spaceOrPost={item} />
				</p>
				{postCount && <PostsAndSubscribers postCount={postCount} />}
			</div>
			<div className="col-span-5 flex items-center justify-between gap-4">
				<ActionButton type="delete" handleAction={handleDelete} />
				<ActionButton
					type={is_published ? 'unpublish' : 'publish'}
					className="basis-20"
					handleAction={handlePublishOrUnpublish}
				/>
				<ButtonComponent
					buttonStyle="danger"
					href={
						type === 'post'
							? `/admin/posts/${slug}/edit`
							: `/admin/spaces/${slug}/edit`
					}
				>
					{type === 'post' ? 'Edit Post' : 'Edit Space'}
				</ButtonComponent>
			</div>
		</div>
	);
};

export default EditCard;
