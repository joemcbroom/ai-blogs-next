'use client';
import Link from 'next/link';
// Reusable button component with styles, click handler, and children

// framework
import { useId } from 'react';

// library
import { Tooltip } from 'react-tooltip';

// types
interface BaseProps {
	children: React.ReactNode;
	disabled?: boolean;
	hoverText?: string;
	type?: any;
	backgroundClass?: string;
	additionalClasses?: string;
}
interface ButtonComponentPropsWithOnClick extends BaseProps {
	onClick?: React.MouseEventHandler;
	href?: string;
}

interface ButtonComponentPropsWithHref extends BaseProps {
	href: string;
	onClick?: React.MouseEventHandler;
}

export default function ButtonComponent({
	children,
	disabled,
	onClick,
	hoverText,
	type,
	href,
	backgroundClass = 'bg-purple-400',
	additionalClasses,
	...rest
}: ButtonComponentPropsWithOnClick | ButtonComponentPropsWithHref) {
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
	const id = useId();
	const isLink = href && href.length > 0;

	interface LinkOrButtonProps {
		children: React.ReactNode;
		href?: string;
	}

	const LinkOrButton: React.FC<LinkOrButtonProps> = ({ children, href }) => {
		return href ? <Link href={href}>{children}</Link> : <>{children}</>;
	};

	return (
		<LinkOrButton href={href}>
			<button
				onClick={(e) => (isLink ? null : !disabled && onClick && onClick(e))}
				className={`rounded-full px-4 py-2 text-xs font-bold text-white ${disabledClass} ${backgroundClass} ${additionalClasses}`}
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
		</LinkOrButton>
	);
}
