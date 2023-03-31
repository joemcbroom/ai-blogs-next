import { PhotoIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import ImgComponent from './ImgComponent';

interface ImageUploaderProps {
	onChange: (file: File) => void;
	image?: File;
	fileUrl?: string;
}

function ImageUploader({ onChange, image, fileUrl }: ImageUploaderProps) {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	// component ref
	const fileInputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
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
		<div
			className="flex h-64 w-64 cursor-pointer items-center justify-center bg-gray-200"
			ref={fileInputRef}
			onClick={() => {
				fileInputRef.current?.querySelector('input')?.click();
			}}
		>
			{previewImage ? (
				<ImgComponent
					src={previewImage}
					alt="Preview"
					className="max-h-full max-w-full"
				/>
			) : (
				<div className="text-gray-400">
					<PhotoIcon className="mx-auto h-16 w-16" />
					<p className="text-center">Click to upload image</p>
				</div>
			)}
			<input
				type="file"
				accept="image/*"
				onChange={handleFileInputChange}
				className="hidden"
			/>
		</div>
	);
}

export default ImageUploader;
