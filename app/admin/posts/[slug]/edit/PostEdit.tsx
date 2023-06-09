'use client';

import IconWithText from '#/components/UI/IconWithText';
import ImageUploader from '#/components/UI/ImageUploader';
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import { supabaseStorage, updatePost } from '#/lib/supabase/client';
// types
import { Post } from '#/lib/types/inferred.types';

// hooks
import { useAlert } from '#/lib/hooks/useAlert';

import { ChevronLeftIcon, PencilIcon } from '@heroicons/react/24/solid';
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

interface Props {
	post: Post;
}

const defaultValues = {
	title: '',
	content: '',
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

	const initialPostValues = {
		title: post.title,
		content: post.content || '',
	};

	const [editedValues, dispatch] = useReducer(reducer, initialPostValues, init);

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

		const path = await supabaseStorage.upload({
			file,
			path: newPath,
			bucket,
		});
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
		if (!post.image_path) return;
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
					isMutating ? 'animate-pulse' : ''
				}`}
			>
				<input
					className="min-w-[270px] text-2xl font-bold text-gray-800"
					size={editedValues.title.length}
					defaultValue={editedValues.title}
					ref={titleRef}
					// onChange={(e) => handleEdit(e.target.value, 'title')}
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
				<ContentEditor />
			</div>
		</>
	);
};

export default PostEdit;
