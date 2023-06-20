interface ContainerProps {
	children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
	return (
		<section className={`mx-auto w-screen px-6 lg:max-w-4xl lg:px-0`}>
			{children}
		</section>
	);
};

export default Container;
