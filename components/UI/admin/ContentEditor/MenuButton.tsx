import React from 'react';

export const MenuButton = ({
	onClick,
	disabled,
	classNames,
	children,
}: {
	onClick: () => void;
	disabled?: boolean;
	classNames?: string;
	children: React.ReactNode;
}) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className={`rounded border border-slate-800 px-2 py-1 capitalize ${classNames}`}
	>
		{children}
	</button>
);
