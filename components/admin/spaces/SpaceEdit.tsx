'use client';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
import { PencilIcon } from '@heroicons/react/24/outline';
import PostsAndSubscribers from './PostsAndSubscribers';
import useSpaceEditedText from '#/lib/hooks/useSpaceEditedText';
import ColorPicker from '#/components/UI/ColorPicker';

const SpaceEdit: React.FC<{ space: BlogSpaceWithPosts }> = ({ space }) => {
	const { editedText } = useSpaceEditedText(space);
	const handleEditTitle = () => {
		console.log('edit title');
	};
	const handleEditDescription = () => {
		console.log('edit description');
	};
	const handleUpdateColor = (
		color: string,
		type: 'primary' | 'secondary' | 'tertiary'
	) => {
		console.log(color, type);
	};

	return (
		<>
			<Link href={`/admin/spaces/viewer/`} className="flex items-center">
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="text-sm text-pink-500">Back to Space Viewer</span>
			</Link>
			<div className="mt-3">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold text-gray-800">{space.name}</h1>
					{/* edit title with pencil icon */}
					<span className="flex items-center gap-1" onClick={handleEditTitle}>
						<PencilIcon className="h-5 w-5" />
						<span className="text-pink-500">Edit title</span>
					</span>
				</div>
				<span className="flex items-center gap-2">
					<PostsAndSubscribers postCount={space.posts.length} />
					<span className="text-sm italic text-slate-400">{editedText}</span>
				</span>
				{/* horizontal line */}
				<div className="mt-3 border-t border-slate-400" />

				{/* space description with edit pencil icon below */}
				<div className="mt-3">
					<p className="my-1 text-sm">
						{space.description || 'No description yet'}
					</p>
					{/* edit description with pencil icon */}
					<span
						className="flex items-center gap-1"
						onClick={handleEditDescription}
					>
						<PencilIcon className="h-5 w-5" />
						<span className="text-pink-500">Edit description</span>
					</span>
				</div>

				{/* space colors with color pickers */}
				<div className="mt-3">
					<h2 className="text-lg font-semibold">Space Colors</h2>
					{/* color pickers */}
					<ColorPicker
						color={space.primary_color || '#000000'}
						label="Main"
						subLabel="Logo, icons, links, primary buttons"
						handleChange={(color) => handleUpdateColor(color, 'primary')}
					/>
					<ColorPicker
						color={space.secondary_color || '#000000'}
						label="Secondary"
						subLabel="Secondary buttons, tags"
						handleChange={(color) => handleUpdateColor(color, 'secondary')}
					/>
					<ColorPicker
						color={space.tertiary_color || '#000000'}
						label="Tertiary"
						subLabel="Backgrounds, borders"
						handleChange={(color) => handleUpdateColor(color, 'tertiary')}
					/>
				</div>
			</div>
		</>
	);
};

export default SpaceEdit;
