'use client';
// library
import { useEffect, useReducer, useRef, useState, useTransition } from 'react';

// framework
import { useRouter } from 'next/navigation';

// custom module
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
import { supabaseStorage, updateSpace } from '#/lib/supabase/client';
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import useSpaceEditedText from '#/lib/hooks/useSpaceEditedText';
import { useAlert } from '#/lib/hooks/useAlert';

// UI components
import Link from 'next/link';
import { ChevronLeftIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import PostsAndSubscribers from './PostsAndSubscribers';
import ColorPicker from '#/components/UI/ColorPicker';
import Tabs from '#/components/UI/TabsComponent';
import ImageUploader from '#/components/UI/ImageUploader';
import IconWithText from '#/components/UI/IconWithText';
import FrontPageTab from '#/components/admin/spaces/SpaceEdit/FrontPageTab';

const defaultValues = {
	name: '',
	description: '',
	primary_color: '#000000',
	secondary_color: '#000000',
	tertiary_color: '#000000',
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
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const { showAlert } = useAlert();

	const initialSpaceValues = {
		name: space.name,
		description: space.description || defaultValues.description,
		primary_color: space.primary_color || defaultValues.primary_color,
		secondary_color: space.secondary_color || defaultValues.secondary_color,
		tertiary_color: space.tertiary_color || defaultValues.tertiary_color,
	};

	const [editedValues, dispatch] = useReducer(
		reducer,
		initialSpaceValues,
		init
	);

	useEffect(() => {
		if (!space.image_path) {
			return setImageUrl(undefined);
		}
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
		// reset name and description
		nameRef.current!.value = space.name;
		descriptionRef.current!.value = space.description || '';
		setHasChanges(false);
		showAlert({
			message: 'Changes cleared',
			type: 'success',
		});
	};

	const [isPending, startTransition] = useTransition();
	const [isSaving, setIsSaving] = useState(false);
	const isMutating = isSaving || isPending;

	const handleUpdateImage = async (file: File) => {
		setIsSaving(true);
		const hasImage = space.image_path ? true : false;
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;

		if (hasImage) {
			// Delete old image
			const paths = [space.image_path!];
			await supabaseStorage.delete({ bucket, paths });
		}

		const newPath = `${SUPABASE_CONSTANTS.SPACE_IMAGES_PATH}/${
			file.name
		}${Date.now()}`;

		const path = await supabaseStorage.upload({
			file,
			path: newPath,
			bucket,
		});
		await updateSpace(space.slug, { image_path: path });
		setIsSaving(false);

		startTransition(() => {
			showAlert({
				message: 'Image saved',
				type: 'success',
			});
			router.refresh();
		});
	};

	const handleClearImage = async () => {
		if (!space.image_path) return;
		setIsSaving(true);
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;
		const paths = [space.image_path];
		await supabaseStorage.delete({ bucket, paths });
		await updateSpace(space.slug, { image_path: null });
		setIsSaving(false);

		startTransition(() => {
			showAlert({
				message: 'Image cleared',
				type: 'success',
			});
			router.refresh();
		});
	};

	const handleSaveChanges = async () => {
		setIsSaving(true);
		await updateSpace(space.slug, editedValues);
		setIsSaving(false);
		startTransition(() => {
			showAlert({
				message: 'Changes saved',
				type: 'success',
			});
			setHasChanges(false);
			router.refresh();
		});
	};

	const colorChangeHandlers = {
		primary: (color: string) => handleEdit(color, 'primary_color'),
		secondary: (color: string) => handleEdit(color, 'secondary_color'),
		tertiary: (color: string) => handleEdit(color, 'tertiary_color'),
	};

	return (
		<>
			<Link href={`/admin/spaces/viewer/`} className="flex items-center">
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="text-sm text-pink-500">Back to Space Viewer</span>
			</Link>
			<div className={`mt-3 ${isMutating ? 'animate-pulse' : ''}`}>
				<div className="flex items-center gap-2">
					<input
						className="text-2xl font-bold text-gray-800"
						defaultValue={editedValues.name}
						ref={nameRef}
						onChange={(e) => handleEdit(e.target.value, 'name')}
					/>
					{/* edit name with pencil icon */}
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
							text="Edit name"
							onClick={() => nameRef.current?.focus()}
						/>
					)}
				</div>

				<span className="flex items-center gap-2">
					<PostsAndSubscribers postCount={space?.posts?.length ?? 0} />
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
						color={editedValues.primary_color}
						label="Main"
						subLabel="Logo, icons, links, primary buttons"
						handleChange={(color) => colorChangeHandlers.primary(color)}
					/>
					<ColorPicker
						color={editedValues.secondary_color}
						label="Secondary"
						subLabel="Secondary buttons, tags"
						handleChange={(color) => colorChangeHandlers.secondary(color)}
					/>
					<ColorPicker
						color={editedValues.tertiary_color}
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

const BlogPostsTab = () => {
	return <div>Blog Posts</div>;
};

const SubscribersTab = () => {
	return <div>Subscribers</div>;
};

export default SpaceEdit;
