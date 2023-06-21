import NavBar from '#/components/UI/NavBar';
import Footer from '#/components/UI/footer';
import { Metadata } from 'next';

export const revalidate = 360;

export const metadata: Metadata = {
	title: 'Spaces | Blogverse.ai',
	description: 'Explore the Blogverse',
};

type HomeLayoutProps = {
	children: React.ReactNode;
};
const HomeLayout = async ({ children }: HomeLayoutProps) => {
	return (
		<div
			id="main-content-wrapper"
			className="grid min-h-full w-full bg-white text-black dark:bg-black dark:text-white"
		>
			<NavBar />
			<main className="h-full w-full">
				{children}
				<Footer />
			</main>
		</div>
	);
};

export default HomeLayout;
