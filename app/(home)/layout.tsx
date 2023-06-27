import NavBar from '#/components/UI/NavBar';
import Footer from '#/components/UI/footer';

const HomeLayout = ({ children }: { children: React.ReactNode }) => (
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
export default HomeLayout;
