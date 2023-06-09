import formatNumberString from '#/lib/utils/formatNumberString';
import { Square2StackIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface PostsAndSubscribersProps {
	postCount: number;
	subscriberCount?: number;
}

export default function PostsAndSubscribers({
	postCount,
	subscriberCount,
}: PostsAndSubscribersProps) {
	return (
		<span className="inline-flex items-center gap-1">
			<Square2StackIcon className="inline-block h-5 w-5" />
			<span className="text-pink-500">({formatNumberString(postCount)})</span>
			Post{postCount === 1 ? '' : 's'}
			{subscriberCount && (
				<>
					<UserGroupIcon className="inline-block h-5 w-5" />
					<span className="text-pink-500">
						({formatNumberString(subscriberCount)})
					</span>
					Subscriber{subscriberCount === 1 ? '' : 's'}
				</>
			)}
		</span>
	);
}
