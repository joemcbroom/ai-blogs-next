'use client';
import Link from 'next/link';
import { ChevronLeftIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import PostsAndSubscribers from './PostsAndSubscribers';
import useSpaceEditedText from '#/lib/hooks/useSpaceEditedText';
import ColorPicker from '#/components/UI/ColorPicker';
import Tabs from '#/components/UI/TabsComponent';
import ImageUploader from '#/components/UI/ImageUploader';
import { useEffect, useReducer, useRef, useState } from 'react';
import supabase, { supabaseStorage, updateSpace } from '#/lib/supabase';
import { useRouter } from 'next/navigation';
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import IconWithText from '#/components/UI/IconWithText';

const defaultValues = {
	title: '',
	description: '',
	primaryColor: '#000000',
	secondaryColor: '#000000',
	tertiaryColor: '#000000',
};

type ActionType =
	| { type: 'EDIT'; field: keyof typeof defaultValues; value: string }
	| { type: 'RESET'; initialValues: typeof defaultValues };

const init = (initialValues: typeof defaultValues) => initialValues;

const reducer = (state: typeof defaultValues, action: ActionType) => {
	switch (action.type) {
		case 'EDIT':
			return {
				...state,
				[action.field]: action.value || defaultValues[action.field],
			};
		case 'RESET':
			return init(action.initialValues);
		default:
			return state;
	}
};

const SpaceEdit: React.FC<{ space: BlogSpaceWithPosts }> = ({ space }) => {
	const router = useRouter();
	const { editedText } = useSpaceEditedText(space);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
	const [hasChanges, setHasChanges] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const initialSpaceValues = {
		title: space.name,
		description: space.description || defaultValues.description,
		primaryColor: space.primary_color || defaultValues.primaryColor,
		secondaryColor: space.secondary_color || defaultValues.secondaryColor,
		tertiaryColor: space.tertiary_color || defaultValues.tertiaryColor,
	};

	const [editedValues, dispatch] = useReducer(
		reducer,
		initialSpaceValues,
		init
	);

	useEffect(() => {
		if (!space.image_path) return;
		const publicUrl = supabaseStorage.getPublicUrl({
			bucket: SUPABASE_CONSTANTS.PUBLIC_BUCKET,
			path: space.image_path!,
		});
		setImageUrl(publicUrl);
	}, [space]);

	const handleEdit = (value: string, field: keyof typeof defaultValues) => {
		dispatch({ type: 'EDIT', field, value });
		setHasChanges(true);
	};

	const handleClearChanges = () => {
		dispatch({ type: 'RESET', initialValues: initialSpaceValues });
		// reset title and description
		titleRef.current!.value = space.name;
		descriptionRef.current!.value = space.description || '';
		setHasChanges(false);
	};

	const handleUpdateImage = async (file: File) => {
		const hasImage = space.image_path ? true : false;
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;

		if (!hasImage) {
			await supabaseStorage.delete({ bucket, paths: [space.image_path!] });
		}

		const fileType = file.type.split('/')[1];
		const newPath = `${SUPABASE_CONSTANTS.SPACE_IMAGES_PATH}/${space.slug}.${fileType}`;
		await supabaseStorage.upload({
			file,
			path: newPath,
			bucket,
			upsert: hasImage,
		});
		updateSpace(space.slug, { image_path: newPath });
		router.refresh();
	};

	const handleClearImage = async () => {
		if (!space.image_path) return;
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;
		const paths = [space.image_path];
		await supabaseStorage.delete({ bucket, paths });
		updateSpace(space.slug, { image_path: null });
		router.refresh();
	};

	const handleSaveChanges = () => {
		console.log('save changes');
	};

	const colorChangeHandlers = {
		primary: (color: string) => handleEdit(color, 'primaryColor'),
		secondary: (color: string) => handleEdit(color, 'secondaryColor'),
		tertiary: (color: string) => handleEdit(color, 'tertiaryColor'),
	};

	return (
		<>
			<Link href={`/admin/spaces/viewer/`} className="flex items-center">
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="text-sm text-pink-500">Back to Space Viewer</span>
			</Link>
			<div className="mt-3">
				<div className="flex items-center gap-2">
					<input
						className="text-2xl font-bold text-gray-800"
						defaultValue={editedValues.title}
						ref={titleRef}
						onChange={(e) => handleEdit(e.target.value, 'title')}
					/>
					{/* edit title with pencil icon */}
					{hasChanges ? (
						<>
							<IconWithText
								icon={CheckCircleIcon}
								text="Save"
								onClick={handleSaveChanges}
							/>
							<IconWithText
								icon={XCircleIcon}
								text="Clear"
								onClick={handleClearChanges}
							/>
						</>
					) : (
						<IconWithText
							icon={PencilIcon}
							text="Edit Title"
							onClick={() => titleRef.current?.focus()}
						/>
					)}
				</div>

				<span className="flex items-center gap-2">
					<PostsAndSubscribers postCount={space.posts.length} />
					<span className="text-sm italic text-slate-400">{editedText}</span>
				</span>
				{/* horizontal line */}
				<div className="mt-3 border-t border-slate-400" />

				{/* space description with edit pencil icon below */}
				<div className="mt-3">
					<textarea
						className="w-full text-sm"
						defaultValue={editedValues.description}
						onChange={(e) => handleEdit(e.target.value, 'description')}
						ref={descriptionRef}
					/>
					{/* edit description with pencil icon */}
					<IconWithText
						icon={PencilIcon}
						text="Edit description"
						onClick={() => descriptionRef.current?.focus()}
					/>
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
						color={editedValues.primaryColor}
						label="Main"
						subLabel="Logo, icons, links, primary buttons"
						handleChange={(color) => colorChangeHandlers.primary(color)}
					/>
					<ColorPicker
						color={editedValues.secondaryColor}
						label="Secondary"
						subLabel="Secondary buttons, tags"
						handleChange={(color) => colorChangeHandlers.secondary(color)}
					/>
					<ColorPicker
						color={editedValues.tertiaryColor}
						label="Tertiary"
						subLabel="Backgrounds, borders"
						handleChange={(color) => colorChangeHandlers.tertiary(color)}
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
											onClear={handleClearImage}
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
