import { PhotoIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import IconWithText from './IconWithText';
import ImgComponent from './ImgComponent';

interface ImageUploaderProps {
	onChange: (file: File) => void;
	onClear: () => void;
	image?: File;
	fileUrl?: string;
}

function ImageUploader({
	onChange,
	onClear,
	image,
	fileUrl,
}: ImageUploaderProps) {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	// component ref
	const fileInputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!image && !fileUrl) {
			return setPreviewImage(null);
		}
		if (image) {
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = () => {
				setPreviewImage(reader.result as string);
			};
			return;
		}
		if (fileUrl) {
			setPreviewImage(fileUrl);
		}
	}, [image, fileUrl]);

	function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPreviewImage(reader.result as string);
			onChange(file);
		};
	}
	return (
		<>
			<div
				className="relative z-10 flex max-w-fit cursor-pointer items-center justify-center bg-gray-200"
				ref={fileInputRef}
				onClick={() => {
					fileInputRef.current?.querySelector('input')?.click();
				}}
			>
				{previewImage ? (
					<ImgComponent src={previewImage} alt="Preview" className="max-w-lg" />
				) : (
					<div className="grid h-32 w-32 place-items-center text-gray-400">
						<PhotoIcon className="mx-auto h-16 w-16" />
					</div>
				)}
				<input
					type="file"
					accept="image/*"
					onChange={handleFileInputChange}
					className="hidden"
				/>
			</div>
			<span>Click Image To Upload/Change</span>
			{previewImage && (
				<IconWithText
					icon={XCircleIcon}
					text="Clear"
					onClick={() => {
						onClear();
					}}
				/>
			)}
		</>
	);
}

export default ImageUploader;
