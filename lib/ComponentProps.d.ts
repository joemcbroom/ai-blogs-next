import { ColorPicker } from '#/components/UI/ColorPicker1';
import { HTMLInputTypeAttribute } from 'react';
// Define the prop types for components

// BlogverseLogo
export interface BlogverseLogoProps {
	type: 'star' | 'horizontal' | 'vertical' | 'whiteVertical';
	className?: string;
}

// ImgComponent
export interface ImgComponentProps {
	src: string;
	alt: string;
	className?: string;
}

// AdminLink
export interface AdminLinkProps {
	href: string;
	text: string;
	currentPathname: string | null;
	children: React.ReactNode;
}

// AdminHeading
export interface AdminHeadingProps {
	title: string;
	subtitle: string;
}

// AdminButton

export interface ColorPickerProps {
	color?: string;
	handleChange: (color: string) => void;
	label?: string;
	subLabel?: string;
}
