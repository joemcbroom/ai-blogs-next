'use client';

import { useEffect, useId, useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { ColorPickerProps } from '#/lib/ComponentProps';

export default function ColorPicker({
	color,
	handleColorChangeComplete,
}: ColorPickerProps) {
	const [currentColor, setCurrentColor] = useState(color || '#000');
	const [showPicker, setShowPicker] = useState(false);
	const modalId = useId();
	const modalRef = useRef(null);

	const handleColorChange = (hex: string) => {
		setCurrentColor(hex);
	};

	const handleShowPicker = () => {
		const modal = document.getElementById(modalId);
		if (!modal) return;
		setShowPicker(true);
		// @ts-ignore
		modal.showModal();
	};

	const closeModal = () => {
		const modal = document.getElementById(modalId);
		// @ts-ignore
		modal?.close();
	};

	return (
		<>
			<div
				className="w-12 aspect-video rounded border-gray-500 cursor-pointer"
				style={{
					backgroundColor: currentColor,
				}}
				onClick={() => handleShowPicker()}
			/>
			<dialog ref={modalRef} id={modalId}>
				<XCircleIcon
					className="absolute w-4 h-4 top-2 right-2 cursor-pointer"
					onClick={() => closeModal()}
				/>
				{showPicker && (
					<SketchPicker
						color={color}
						onChange={({ hex }) => handleColorChange(hex)}
						onChangeComplete={({ hex }) => handleColorChangeComplete(hex)}
					/>
				)}
			</dialog>
		</>
	);
}
