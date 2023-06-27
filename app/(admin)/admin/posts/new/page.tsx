// components
import AdminHeading from '#/components/UI/admin/AdminHeading';
import CreateBlogPosts from './CreateBlogPosts';

// lib
import { getAllSpaces } from '#/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function NewBlogPostPage() {
	const spaces = await getAllSpaces();

	return (
		<>
			<AdminHeading
				title="Create a new blog post(s)"
				subtitle="Select the Space you want to create posts for"
			/>
			<CreateBlogPosts spaces={spaces} />
		</>
	);
}
