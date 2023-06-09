// components
import AdminHeading from '#/components/UI/admin/AdminHeading';
import PostsViewer from '#/app/admin/posts/viewer/PostsViewer';

// lib
import { getAllPosts } from '#/lib/supabase/server';

export const revalidate = 0;

export default async function SpacesPage() {
	const posts = await getAllPosts();

	return (
		<>
			<AdminHeading
				title="Post Viewer"
				subtitle="Select the Post you wish to edit"
			/>
			<PostsViewer posts={posts} />
		</>
	);
}
