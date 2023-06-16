import { getFeaturedPosts, getSpaces } from '#/lib/supabase/static';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

const HomePage = async () => {
	const spaces = await getSpaces();
	const featuredPosts = await getFeaturedPosts();

	// @ts-expect-error
	return <HomeContent spaces={spaces} featuredPosts={featuredPosts} />;
};

export default HomePage;
