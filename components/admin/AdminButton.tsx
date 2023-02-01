// Reusable button component with styles, click handler, and children

// types
import { AdminButtonProps } from '#/lib/ComponentProps';
import { useId } from 'react';

// library
import { Tooltip } from 'react-tooltip';

export default function AdminButton({
	children,
	disabled,
	onClick,
	hoverText,
	...rest
}: AdminButtonProps) {
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
	const id = useId();
	return (
		<>
			<button
				onClick={() => !disabled && onClick()}
				className={`bg-purple-400 text-white text-xs font-bold py-2 px-4 rounded-full mt-2 ${disabledClass}`}
				id={id}
				data-tooltip-content={hoverText}
				data-tooltip-place="top"
				{...rest}
			>
				{children}
			</button>
			{hoverText && (
				<Tooltip
					anchorId={id}
					style={{
						backgroundColor: '#374151',
						borderRadius: '6px',
						fontSize: '10px',
						padding: '5px',
					}}
				/>
			)}
		</>
	);
}
