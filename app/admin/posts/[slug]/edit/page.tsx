import { getPost } from '#/lib/supabase/server';
import PostEdit from './PostEdit';

export default async function EditPost({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const post = await getPost(slug);
	return (
		<>
			<PostEdit post={post} />
		</>
	);
}
