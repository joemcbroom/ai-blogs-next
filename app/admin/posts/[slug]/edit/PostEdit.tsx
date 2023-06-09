'use client';

import IconWithText from '#/components/UI/IconWithText';
import ImageUploader from '#/components/UI/ImageUploader';
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import { supabaseStorage } from '#/lib/supabase/client';
// types
import { Post, PostUpdate } from '#/lib/types/inferred.types';

// hooks
import { useAlert } from '#/lib/hooks/useAlert';

import {
	ChevronLeftIcon,
	MagnifyingGlassIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	startTransition,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import ContentEditor from '#/components/UI/admin/ContentEditor';
import ButtonComponent from '#/components/UI/ButtonComponent';

interface Props {
	post: Post & { space: { title: string; description: string; slug: string } };
}

const defaultValues = {
	title: '',
	content: '',
	is_published: false,
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

const PostEdit: React.FC<Props> = ({ post }) => {
	const router = useRouter();
	const { showAlert } = useAlert();
	const [isSaving, setIsSaving] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
	const isMutating = isSaving;
	const titleRef = useRef<HTMLInputElement>(null);
	const [hasChanges, setHasChanges] = useState(false);

	const initialPostValues = {
		title: post.title,
		content: post.content || '',
		is_published: post.is_published,
	};

	const [editedValues, dispatch] = useReducer(reducer, initialPostValues, init);

	const handleEdit = (value: string, field: keyof typeof defaultValues) => {
		dispatch({ type: 'EDIT', field, value });
		setHasChanges(true);
	};

	useEffect(() => {
		if (!post.image_path) {
			return setImageUrl(undefined);
		}
		const publicUrl = supabaseStorage.getPublicUrl({
			bucket: SUPABASE_CONSTANTS.PUBLIC_BUCKET,
			path: post.image_path!,
		});
		setImageUrl(publicUrl);
	}, [post]);

	const updatePost = async (slug: string, data: PostUpdate) => {
		await fetch('/api/supabase/post', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ slug, data, spaceSlug: post.space.slug }),
		});
	};

	const handleUpdateImage = async (file: File) => {
		setIsSaving(true);
		const hasImage = post.image_path !== null;
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;

		if (hasImage) {
			// delete old image
			const paths = [post.image_path!];
			await supabaseStorage.delete({ bucket, paths });
		}

		const newPath = `${SUPABASE_CONSTANTS.POST_IMAGES_PATH}/${file.name}`;

		let path = '';
		try {
			path = await supabaseStorage.upload({
				file,
				path: newPath,
				bucket,
			});
		} catch (err: any) {
			setIsSaving(false);
			console.error(err);
			return showAlert({
				message: err.message,
				type: 'error',
			});
		}
		await updatePost(post.slug, { image_path: path });
		setIsSaving(false);

		startTransition(() => {
			showAlert({
				message: 'Image updated',
				type: 'success',
			});
			router.refresh();
		});
	};

	const handleClearImage = async () => {
		if (!post.image_path) return setImageUrl(undefined);
		setIsSaving(true);
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;
		const paths = [post.image_path];
		await supabaseStorage.delete({ bucket, paths });
		await updatePost(post.slug, { image_path: null });
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
		// TODO: save 'previous version'
		setIsSaving(true);
		await updatePost(post.slug, editedValues);
		setIsSaving(false);
		startTransition(() => {
			showAlert({
				message: 'Changes saved',
				type: 'success',
			});
			router.refresh();
		});
	};

	const handleGenerateContent = async () => {
		setIsSaving(true);
		const body = {
			title: editedValues.title,
			content: editedValues.content,
			space_title: post.space?.title,
			space_description: post.space?.description,
			// content_length: 500,
		};

		await fetch('/api/generate/post_content', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		showAlert({
			message: 'Generating content... Please wait up to 2 minutes',
			type: 'info',
		});

		const startTime = Date.now();
		const interval = setInterval(async () => {
			// if longer than 2 minutes, stop
			if (Date.now() - startTime >= 1000 * 60 * 2) {
				clearInterval(interval);
				setIsSaving(false);
				return showAlert({
					message: 'Generation timed out',
					type: 'error',
				});
			}
			const res = await fetch(
				`/api/generate/post_content?title=${body.title}&space_title=${body.space_title}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const { content: cachedContent } = await res.json();
			if (cachedContent !== null) {
				clearInterval(interval);
				handleEdit(cachedContent, 'content');
				setIsSaving(false);
			}
		}, 5000);
	};

	const handlePublishOrUnpublish = async () => {
		setIsSaving(true);

		await fetch('/api/supabase/post', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				slug: post.slug,
				data: { is_published: !post.is_published },
				spaceSlug: post.space.slug,
			}),
		});

		setIsSaving(false);

		startTransition(() => {
			router.refresh();
		});
	};

	return (
		<>
			<Link
				href={`/admin/posts?selected=${post.space_id}`}
				className="flex items-center"
			>
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="text-sm text-pink-500">Back to Posts Viewer</span>
			</Link>
			<div
				className={`mt-3 flex flex-col items-center gap-4 ${
					isMutating
						? 'pointer-events-none animate-pulse cursor-not-allowed'
						: ''
				}`}
			>
				<div className="relative flex w-full items-center justify-center gap-4">
					<Link href={`/${post.space.slug}/${post.slug}?isPreview=true`}>
						<IconWithText
							icon={MagnifyingGlassIcon}
							text="Preview"
							onClick={() => {}}
						/>
					</Link>
					<span
						className={`absolute right-2 top-0 rounded border px-2 py-1 text-sm ${
							post.is_published
								? 'border-green-500 text-green-500'
								: 'border-red-500 text-red-500'
						}`}
					>
						{post.is_published ? 'Published' : 'Unpublished'}
					</span>
				</div>
				<input
					type="text"
					className="min-w-[270px] text-2xl font-bold text-gray-800"
					size={editedValues.title.length}
					value={editedValues.title}
					ref={titleRef}
					onChange={(e) => handleEdit(e.target.value, 'title')}
				/>
				<IconWithText
					icon={PencilIcon}
					text="Edit title"
					onClick={() => titleRef.current?.focus()}
				/>
				<ImageUploader
					onChange={handleUpdateImage}
					onClear={handleClearImage}
					fileUrl={imageUrl}
				/>
				<span className="text-xs">
					Image will default to space image if left blank
				</span>
				<ContentEditor
					content={editedValues.content}
					onUpdate={(contentHtml) => handleEdit(contentHtml, 'content')}
				/>
				<div className="flex gap-4">
					<ButtonComponent
						type="button"
						buttonStyle="primary"
						onClick={() => handleGenerateContent()}
					>
						Generate Content
					</ButtonComponent>
					<ButtonComponent
						type="button"
						buttonStyle="default"
						onClick={() => {
							dispatch({ type: 'RESET', initialValues: initialPostValues });
							showAlert({
								message: 'Changes reverted',
								type: 'success',
							});
						}}
					>
						Cancel
					</ButtonComponent>
					<ButtonComponent
						type="button"
						buttonStyle="primary"
						onClick={() => handleSaveChanges()}
						disabled={!hasChanges}
					>
						Save Changes
					</ButtonComponent>
					<ButtonComponent
						type="button"
						buttonStyle={post.is_published ? 'danger' : 'primary'}
						onClick={() => handlePublishOrUnpublish()}
					>
						{post.is_published ? 'Unpublish' : 'Publish'}
					</ButtonComponent>
				</div>
			</div>
		</>
	);
};

export default PostEdit;
