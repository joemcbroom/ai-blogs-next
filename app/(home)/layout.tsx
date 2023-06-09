import NavBar from '#/components/UI/NavBar';

type HomeLayoutProps = {
	children: React.ReactNode;
};
const HomeLayout = async ({ children }: HomeLayoutProps) => {
	return (
		<div
			id="main-content-wrapper"
			className="h-full bg-white text-black dark:bg-black dark:text-white"
		>
			<NavBar />
			<main className="h-full">{children}</main>
		</div>
	);
};

export default HomeLayout;
