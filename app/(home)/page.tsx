import SpaceCard from '#/components/UI/cards/SpaceCard';
import { getSpaces } from '#/lib/supabase/static';
import Link from 'next/link';

export const dynamic = 'force-static';

export const revalidate = 60;

export default async function HomePage() {
	const spaces = await getSpaces();
	return (
		<>
			<article>
				<div className="mx-auto mt-6 grid max-w-4xl gap-4 px-4 md:grid-cols-auto-fit md:px-0">
					{spaces.map((space) => (
						<SpaceCard key={space.id} space={space} />
					))}
				</div>
			</article>
		</>
	);
}
