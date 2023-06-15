import CardWrapper from '#/components/UI/cards/CardWrapper';
import SpaceCard from '#/components/UI/cards/SpaceCard';
import { getSpaces } from '#/lib/supabase/static';

export const dynamic = 'force-static';

export const revalidate = 60;

export default async function HomePage() {
	const spaces = await getSpaces();
	return (
		<>
			<article>
				<CardWrapper>
					{spaces.map((space) => (
						<SpaceCard key={space.id} space={space} />
					))}
				</CardWrapper>
			</article>
		</>
	);
}
