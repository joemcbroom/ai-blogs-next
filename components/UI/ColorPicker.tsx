'use client';

// framework
import { useState, useRef, useCallback } from 'react';

// library
import { HexColorInput, HexColorPicker } from 'react-colorful';

// hooks
import useClickOutside from '#/lib/hooks/useClickOutside';

interface ColorPickerProps {
	color: string | undefined;
	handleChange: (color: string) => void;
	label?: string;
	subLabel?: string;
}

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
		<div className=" my-6 flex flex-col gap-2">
			{label && <label className="block text-xs">{label}</label>}
			<div className="relative flex items-center gap-2">
				<HexColorInput
					color={color}
					onChange={handleChange}
					prefixed
					className="block w-[200px] rounded-md border border-gray-300 p-2 text-sm"
				/>

				<div
					className="aspect-video w-14 cursor-pointer rounded border-2 border-gray-500"
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
