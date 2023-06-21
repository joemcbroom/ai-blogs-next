import NavBar from '#/components/UI/NavBar';
import Footer from '#/components/UI/footer';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { Metadata } from 'next';

export const revalidate = 360;

export const metadata: Metadata = {
	title: SITE_INFO.title,
	description: SITE_INFO.description,
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
