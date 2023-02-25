// framework
import Link from 'next/link';

const SpaceCard = ({ space }: { space: SpaceType }) => {
	const { name, description, slug, created_at, updated_at } = space;
	const postCount = space.posts.length;
	// "Edited x hours ago" or "Created x hours ago"
	const time = updated_at ? updated_at : created_at;
	const timeAgo = new Date(time).toLocaleString();
	return (
		<div className="rounded border shadow">
			<h3 className="text-xl">{name}</h3>
			<p>{description}</p>
			<p>
				{postCount} post{postCount === 1 ? '' : 's'}
			</p>
			<p>{timeAgo}</p>
			<Link href={`/admin/spaces/viewer/${slug}/edit`}>Edit</Link>
		</div>
	);
};

export default SpaceCard;
