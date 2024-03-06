import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import Image from 'next/image';

const PostHeaderImage = async ({ path }: { path: string }) => {
	const className = 'absolute left-0 top-0 z-0 h-full w-screen object-cover';

	return (
		<>
			<Image
				src={
					path ? SUPABASE_CONSTANTS.PUBLIC_URL(path) : '/images/abstract-bg.jpg'
				}
				width={600}
				height={400}
				alt=""
				className={className}
			/>
		</>
	);
};

export default PostHeaderImage;
