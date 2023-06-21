import NavBar from '#/components/UI/NavBar';
import Footer from '#/components/UI/footer';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';
import { Metadata } from 'next';

export const revalidate = 360;

export const metadata: Metadata = {
	title: 'Blogverse.ai | Spaces',
	description: 'Explore the Blogverse',
	...OGTwitterMetadata({
		title: 'Blogverse.ai | Spaces',
		description: 'Explore the Blogverse',
		path: 'spaces',
	}),
};

type SpacesLayoutProps = {
	children: React.ReactNode;
};
const SpacesLayout = async ({ children }: SpacesLayoutProps) => {
	return <>{children}</>;
};

export default SpacesLayout;
