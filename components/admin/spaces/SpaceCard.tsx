'use client';
// utils
import formatDistanceToNow from '#/lib/utils/formatDistanceToNow';

// library
import { PauseIcon, TrashIcon } from '@heroicons/react/24/solid';

// framework
import Link from 'next/link';
import { useEffect, useState } from 'react';

// components
import AdminButton from '../AdminButton';

const SpaceCard = ({ space }: { space: SpaceType }) => {
	const [editedText, setEditedText] = useState('');
	const { name, slug, created_at, updated_at } = space;
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
					{postCount} post{postCount === 1 ? '' : 's'}
				</p>
				<Link href={`/admin/spaces/viewer/${slug}/edit`}>Edit</Link>
			</div>
			<div className="flex items-center justify-center">
				<button>
					<TrashIcon className="h-5 w-5 fill-current" />
					<span>Delete</span>
				</button>
				<button>
					<PauseIcon className="h-5 w-5 fill-current" />
					<span>Pause</span>
				</button>
				<AdminButton href={`/admin/spaces/viewer/${slug}/edit`}>
					Edit Space
				</AdminButton>
			</div>
		</div>
	);
};

export default SpaceCard;
