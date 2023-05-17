'use client';

import ButtonComponent from '#/components/UI/ButtonComponent';
import { PauseIcon } from '@heroicons/react/24/solid';
import EditedText from '../EditedText';
import PostsAndSubscribers from '../PostsAndSubscribers';
import ActionButton from './ActionButton';
import { supabase } from '#/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
	BlogSpaceWithAbbreviatedPosts,
	PartialPost,
} from '#/lib/types/inferred.types';

const itemIsBlogSpace = (
	item: BlogSpaceWithAbbreviatedPosts | PartialPost
): item is BlogSpaceWithAbbreviatedPosts => {
	return (item as BlogSpaceWithAbbreviatedPosts).posts !== undefined;
};

const EditCard = ({
	item,
	type,
}: {
	item: BlogSpaceWithAbbreviatedPosts | PartialPost;
	type: 'post' | 'space';
}) => {
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const router = useRouter();

	const isMutating = isFetching || isPending;

	const { slug, title, id, is_published } = item;
	const postCount = (itemIsBlogSpace(item) && item?.posts?.length) || null;

	const handleDelete = async () => {
		setIsFetching(true);

		const { error } = await supabase.from(type).delete().eq('id', id);

		if (error) throw error;

		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	const handlePublishOrUnpublish = async () => {
		setIsFetching(true);

		const { error } = await supabase
			.from(type)
			.update({ is_published: !is_published })
			.eq('id', id);

		if (error) throw error;

		setIsFetching(false);

		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<div
			className={`grid grid-cols-1 gap-4 rounded-lg border border-slate-400 p-6 md:grid-cols-3 ${
				isMutating ? 'animate-pulse' : ''
			}`}
		>
			<div className="col-span-2 flex flex-col gap-1">
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
			<div className="flex flex-1 items-center justify-between gap-4">
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
							? `/admin/posts/viewer/${slug}/edit`
							: `/admin/spaces/viewer/${slug}/edit`
					}
				>
					{type === 'post' ? 'Edit Post' : 'Edit Space'}
				</ButtonComponent>
			</div>
		</div>
	);
};

export default EditCard;
