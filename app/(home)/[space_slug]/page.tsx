import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import Link from 'next/link';

export const revalidate = 30;

const getPosts = async (space_slug: string) => {
	const { data: posts, error } = await supabase
		.from('post')
		.select(`*, space!inner(slug)`)
		.eq('is_published', true)
		.eq('space.slug', space_slug);

	if (error) {
		console.error(error);
		throw error.message;
	}

	return posts as Post[];
};
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
