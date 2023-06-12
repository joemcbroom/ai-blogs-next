import NavBar from '#/components/UI/NavBar';

export const metadata = {
	metadataBase: new URL(
		`https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3000'
	),
};

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
