interface HeadingProps {
	children: React.ReactNode;
	variant?: 'h1' | 'h2' | 'h3' | 'h4';
}
const Heading = ({ children, variant = 'h1' }: HeadingProps) => {
	const HeadingTag = variant;
	const headingClasses = {
		h1: 'text-2xl my-4',
		h2: 'text-xl my-3',
		h3: 'text-lg my-2',
		h4: 'text-base my-1',
	};
	return (
		<HeadingTag
			className={`font-bold text-neutral-900 dark:text-neutral-100 ${headingClasses[variant]}`}
		>
			{children}
		</HeadingTag>
	);
};

export default Heading;
