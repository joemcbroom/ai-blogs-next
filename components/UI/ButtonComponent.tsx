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
	buttonStyle?: ButtonStyle;
}
interface ButtonComponentPropsWithOnClick extends BaseProps {
	onClick?: React.MouseEventHandler;
	href?: string;
}

interface ButtonComponentPropsWithHref extends BaseProps {
	href: string;
	onClick?: React.MouseEventHandler;
}

type ButtonStyle = 'default' | 'primary' | 'secondary' | 'danger';

const buttonClass: Record<ButtonStyle, string> = {
	default: 'bg-purple-500 hover:bg-purple-700 text-white',
	primary: 'bg-green-600 hover:bg-green-700 text-white',
	secondary: 'bg-white hover:bg-slate-50 text-slate-900',
	danger: 'bg-red-600 hover:bg-red-700 text-white',
};

export default function ButtonComponent({
	children,
	disabled,
	onClick,
	hoverText,
	type,
	href,
	buttonStyle = 'default',
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
				className={`rounded-full px-4 py-2 text-xs font-bold ${disabledClass} ${buttonClass[buttonStyle]}`}
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
