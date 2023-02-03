// Reusable button component with styles, click handler, and children

// types
type AdminButtonProps = {
	children: React.ReactNode;
	disabled?: boolean;
	hoverText?: string;
	type?: any;
	onClick?: () => void;
};

import { useId } from 'react';

// library
import { Tooltip } from 'react-tooltip';

export default function AdminButton({
	children,
	disabled,
	onClick,
	hoverText,
	type,
	...rest
}: AdminButtonProps) {
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
	const id = useId();
	return (
		<>
			<button
				onClick={() => !disabled && onClick && onClick()}
				className={`bg-purple-400 text-white text-xs font-bold py-2 px-4 rounded-full mt-2 ${disabledClass}`}
				id={id}
				data-tooltip-content={hoverText}
				data-tooltip-place="top"
				type={type}
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
