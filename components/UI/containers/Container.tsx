interface ContainerProps {
	children: React.ReactNode;
	type?: 'postContent';
	fade?: boolean;
}
const Container = ({ children, type, fade = false }: ContainerProps) => {
	const isPostContent = type === 'postContent';
	return (
		<section
			data-id="container"
			className={` mx-auto my-4 w-screen max-w-8xl px-6 relative${
				isPostContent ? ' ProseMirror' : ''
			} ${fade ? ' mask-image' : ''}`}
		>
			{children}
		</section>
	);
};

export default Container;
