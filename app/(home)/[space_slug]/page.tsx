import { getPosts, getSpace, supabase } from '#/lib/supabase/static';
import Link from 'next/link';
import SpaceContent from './SpaceContent';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export const dynamic = 'force-static';

const BlogHome = async ({
	params: { space_slug },
}: {
	params: { space_slug: string };
}) => {
	try {
		const posts = await getPosts(space_slug);
		const space = await getSpace(space_slug);
		if (!posts?.length) {
			return <div>no (published) posts</div>;
		}

		return <SpaceContent posts={posts} space={space} />;
	} catch (e) {
		return notFound();
	}
};

export default BlogHome;
