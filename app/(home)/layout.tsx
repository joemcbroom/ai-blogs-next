import NavBar from '#/components/UI/NavBar';
import { Metadata } from 'next';
import Script from 'next/script';

export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Blogverse!',
	description: 'A whole new universe of blogs',
	metadataBase: new URL(
		`https://${process.env.VERCEL_URL}` ||
			`https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
			'http://localhost:3000'
	),
};

type HomeLayoutProps = {
	children: React.ReactNode;
};
const HomeLayout = async ({ children }: HomeLayoutProps) => {
	return (
		<>
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9658193107419462"
			/>
			<div
				id="main-content-wrapper"
				className="h-full bg-white text-black dark:bg-black dark:text-white"
			>
				<NavBar />
				<main className="h-full">{children}</main>
			</div>
		</>
	);
};

export default HomeLayout;
