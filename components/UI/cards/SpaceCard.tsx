import type { BlogSpace } from '#/lib/types/inferred.types';
import Card from './Card';

interface SpaceCardProps {
	space: BlogSpace;
	variant?: 'normal' | 'featured';
}

const SpaceCard = ({ space }: SpaceCardProps) => {
	return (
		<Card
			{...space}
			url={`/${space.slug}`}
			image_path={space.image_path || 'space/logo-blogverse-horiz.png'}
		/>
	);
};

export default SpaceCard;
