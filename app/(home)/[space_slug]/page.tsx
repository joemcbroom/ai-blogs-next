import { getPosts, supabase } from '#/lib/supabase/static';
import Link from 'next/link';

export const revalidate = 30;

const BlogHome = async ({
	params: { space_slug },
}: {
	params: { space_slug: string };
}) => {
	const posts = await getPosts(space_slug);
	if (!posts?.length) {
		return <div>no (published) posts</div>;
	}

	return (
		<>
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
