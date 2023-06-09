'use client';
// Reusable button component with styles, click handler, and children

// types
interface BaseProps {
	children: React.ReactNode;
	disabled?: boolean;
	hoverText?: string;
	type?: any;
}
interface AdminButtonPropsWithOnClick extends BaseProps {
	onClick: () => void;
	href?: string;
}

interface AdminButtonPropsWithHref extends BaseProps {
	href: string;
	onClick?: () => void;
}

type AdminButtonProps = AdminButtonPropsWithOnClick | AdminButtonPropsWithHref;

import { useRouter } from 'next/navigation';
import { useId } from 'react';

// library
import { Tooltip } from 'react-tooltip';

export default function AdminButton({
	children,
	disabled,
	onClick,
	hoverText,
	type,
	href,
	...rest
}: AdminButtonProps) {
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
	const id = useId();
	const isLink = href && href.length > 0;
	const router = useRouter();
	const handleClick = () => {
		if (isLink) {
			router.push(href);
		} else {
			!disabled && onClick && onClick();
		}
	};

	return (
		<>
			<button
				onClick={() => handleClick()}
				className={`mt-2 rounded-full bg-purple-400 py-2 px-4 text-xs font-bold text-white ${disabledClass}`}
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
