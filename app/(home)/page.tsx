import { getFeaturedPosts, getSpaces } from '#/lib/supabase/static';
import { notFound } from 'next/navigation';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

const HomePage = async () => {
	try {
		const spaces = await getSpaces();
		const featuredPosts = await getFeaturedPosts();

		// @ts-expect-error
		return <HomeContent spaces={spaces} featuredPosts={featuredPosts} />;
	} catch (e) {
		notFound();
	}
};

export default HomePage;
