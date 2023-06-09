'use client';
import Link from 'next/link';
import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
import { PencilIcon } from '@heroicons/react/24/outline';
import PostsAndSubscribers from './PostsAndSubscribers';
import useSpaceEditedText from '#/lib/hooks/useSpaceEditedText';
import ColorPicker from '#/components/UI/ColorPicker';
import Tabs from '#/components/UI/TabsComponent';
import ImageUploader from '#/components/UI/ImageUploader';
import { useEffect, useRef, useState } from 'react';
import supabase from '#/lib/supabase';
import { useRouter } from 'next/navigation';

const SpaceEdit: React.FC<{ space: BlogSpaceWithPosts }> = ({ space }) => {
	const { editedText } = useSpaceEditedText(space);
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		// check if image exists in supabase bucket
		const fetchImage = async () => {
			const { data } = supabase.storage
				.from('space')
				.getPublicUrl(`space/${space.slug}`);
			if (data) {
				setImageUrl(data.publicUrl);
			}
		};
		fetchImage();
	}, [space]);

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
	const handleUpdateImage = async (file: File) => {
		// Upload to supabase bucket 'space' path: space.id
		const { error } = await supabase.storage
			.from('space')
			.upload(`${space.slug}`, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			console.error(error);
			return;
		}
	};

	return (
		<>
			<Link href={`/admin/spaces/viewer/`} className="flex items-center">
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="text-sm text-pink-500">Back to Space Viewer</span>
			</Link>
			<div className="mt-3">
				<div className="flex items-center gap-2">
					<h1
						contentEditable={isEditingTitle}
						className="text-2xl font-bold text-gray-800"
						ref={titleRef}
					>
						{space.name}
					</h1>
					{/* edit title with pencil icon */}
					<span
						className="flex cursor-pointer items-center gap-1"
						onClick={() => {
							setIsEditingTitle(!isEditingTitle);
							titleRef.current?.focus();
						}}
					>
						{isEditingTitle ? (
							<>
								<CheckIcon className="h-5 w-5" />
								<span>Save</span>
							</>
						) : (
							<>
								<PencilIcon className="h-5 w-5" />
								<span className="text-pink-500">Edit title</span>
							</>
						)}
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
					<p>
						Want some color ideas?
						<Link className="pl-2 text-pink-500" href="https://coolors.co/">
							Color Palette Generator
						</Link>
					</p>
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

				{/* Tabs for front page, blog posts, and subscribers */}
				<div className="mt-3">
					<Tabs
						tabs={[
							{
								title: 'Front Page',
								content: (
									<FrontPageTab>
										<ImageUploader
											onChange={handleUpdateImage}
											fileUrl={imageUrl}
										/>
									</FrontPageTab>
								),
							},
							{ title: 'Blog Posts', content: <BlogPostsTab /> },
							{ title: 'Subscribers', content: <SubscribersTab /> },
						]}
					/>
				</div>
			</div>
		</>
	);
};

const FrontPageTab = ({ children }: { children: JSX.Element }): JSX.Element => {
	return (
		<>
			<h2 className="text-lg font-semibold">Main Image</h2>
			<p>
				Looking for cool creative common images?
				{/* link to unsplash, pexels, pixabay */}
				<Link className="pl-1 text-pink-500" href="https://unsplash.com/">
					Unsplash /
				</Link>
				<Link className="pl-1 text-pink-500" href="https://www.pexels.com/">
					Pexels /
				</Link>
				<Link className="pl-1 text-pink-500" href="https://pixabay.com/">
					Pixabay
				</Link>
			</p>
			{children}
		</>
	);
};

const BlogPostsTab = () => {
	return <div>Blog Posts</div>;
};

const SubscribersTab = () => {
	return <div>Subscribers</div>;
};

export default SpaceEdit;
