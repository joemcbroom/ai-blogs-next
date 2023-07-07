import CardWrapper from '#/components/UI/cards/CardWrapper';
import SpaceCard from '#/components/UI/cards/SpaceCard';
import Container from '#/components/UI/containers/Container';
import Heading from '#/components/UI/headings/Heading';
import { getSpaces } from '#/lib/supabase/static';

export const dynamic = 'force-static';

export const revalidate = 360;

const SpacesPage = async () => {
	const spaces = await getSpaces();
	return (
		<>
			<article>
				<Container fade={true}>
					<Heading>Spaces</Heading>
					<CardWrapper>
						{spaces.map((space) => (
							<SpaceCard key={space.id} space={space} />
						))}
					</CardWrapper>
				</Container>
			</article>
		</>
	);
};

export default SpacesPage;
