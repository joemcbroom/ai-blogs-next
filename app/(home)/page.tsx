import { getSpaces } from '#/lib/supabase/static';
import Link from 'next/link';

export const dynamic = 'force-static';

export default async function HomePage() {
	const spaces = await getSpaces();
	return (
		<>
			<ol className="list-inside list-decimal p-4 text-xs">
				{spaces.map((space) => {
					const totalPosts = space?.posts?.length || 0;
					const publishedPosts =
						space?.posts?.filter((post) => post.is_published).length || 0;
					return (
						<li key={space.slug} className="my-2">
							<Link href={`/${space.slug}`} className="underline">
								{space.title} ({publishedPosts}/{totalPosts} published)
							</Link>
						</li>
					);
				})}
			</ol>
		</>
	);
}
