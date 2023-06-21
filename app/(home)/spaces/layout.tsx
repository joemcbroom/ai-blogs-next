import NavBar from '#/components/UI/NavBar';
import Footer from '#/components/UI/footer';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';
import { Metadata } from 'next';

export const revalidate = 360;

const { title, description } = SITE_INFO.spaces;
export const metadata: Metadata = {
	title,
	description,
	...OGTwitterMetadata({
		title,
		description,
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
