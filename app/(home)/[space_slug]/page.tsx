import { getPosts, getSpace, supabase } from '#/lib/supabase/static';
import Link from 'next/link';
import SpaceContent from './SpaceContent';

export const revalidate = 60;

export const dynamic = 'force-static';

const BlogHome = async ({
	params: { space_slug },
}: {
	params: { space_slug: string };
}) => {
	const posts = await getPosts(space_slug);
	const space = await getSpace(space_slug);
	if (!posts?.length) {
		return <div>no (published) posts</div>;
	}

	return (
		<>
			<SpaceContent posts={posts} space={space} />

			<ol className="list-inside list-decimal p-4 text-xs">
				{posts.map((post) => (
					<li key={post.slug} className="my-2">
						<Link href={`/${space_slug}/${post.slug}`} className="underline">
							{post.title}
						</Link>
					</li>
				))}
			</ol>
		</>
	);
};

export default BlogHome;
