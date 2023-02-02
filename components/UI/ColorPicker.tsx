'use client';

// types
import { ColorPickerProps } from '#/lib/ComponentProps';

// framework
import { useState, useRef, useCallback } from 'react';

// library
import { HexColorInput, HexColorPicker } from 'react-colorful';

// hooks
import useClickOutside from 'lib/hooks/useClickOutside';

export default function ColorPicker({
	color,
	handleChange,
	label,
	subLabel,
}: ColorPickerProps) {
	const [showPicker, setShowPicker] = useState(false);
	const popover = useRef(null);

	const close = useCallback(() => setShowPicker(false), []);
	useClickOutside(popover, close);

	return (
		<div className="my-4 flex flex-col gap-2">
			{label && (
				<label className="block text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<div className="flex items-center gap-2 relative">
				<HexColorInput
					color={color}
					onChange={handleChange}
					prefixed
					className="block border border-gray-300 rounded-md p-2 w-[200px] text-sm"
				/>

				<div
					className="w-14 aspect-video rounded border-gray-500 cursor-pointer"
					style={{ backgroundColor: color }}
					onClick={() => {
						setShowPicker(true);
					}}
				/>
				{showPicker && (
					<div
						ref={popover}
						className="absolute -bottom-20 left-72 rounded-md shadow-md"
					>
						<HexColorPicker
							color={color}
							onChange={handleChange}
							className="absolute top-0"
						/>
					</div>
				)}
			</div>
			{subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
		</div>
	);
}
