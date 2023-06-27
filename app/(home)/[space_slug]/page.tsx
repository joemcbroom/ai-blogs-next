import {
	getPosts,
	getSpace,
	getSpaceWithPosts,
	supabase,
} from '#/lib/supabase/static';
import Link from 'next/link';
import SpaceContent from './SpaceContent';
import { notFound } from 'next/navigation';

export const revalidate = 360;

export const dynamic = 'force-static';

const BlogHome = async ({
	params: { space_slug },
}: {
	params: { space_slug: string };
}) => {
	try {
		const space = await getSpaceWithPosts(space_slug);

		return <SpaceContent posts={space.posts || []} space={space} />;
	} catch (e) {
		return notFound();
	}
};

export default BlogHome;
