import { supabase } from '#/lib/supabase/static';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const getSpaces = async () => {
	const { data: spaces, error } = await supabase
		.from('space')
		.select('*, posts: post(slug)')
		.eq('is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	return spaces as BlogSpaceWithPosts[];
};

export default async function HomePage() {
	const spaces = await getSpaces();
	return (
		<>
			<ol className="list-inside list-decimal p-4 text-xs">
				{spaces.map((space) => (
					<li key={space.slug} className="my-2">
						<Link href={`/${space.slug}`} className="underline">
							{space.title} ({space?.posts?.length || 0} posts)
						</Link>
					</li>
				))}
			</ol>
		</>
	);
}
