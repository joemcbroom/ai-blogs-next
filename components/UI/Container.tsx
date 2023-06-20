interface ContainerProps {
	children: React.ReactNode;
	type?: 'postContent';
}
const Container = ({ children, type }: ContainerProps) => {
	const isPostContent = type === 'postContent';
	return (
		<section
			className={`mx-auto w-screen px-6 lg:max-w-4xl lg:px-0 ${
				isPostContent ? 'ProseMirror' : ''
			}`}
		>
			{children}
		</section>
	);
};

export default Container;
