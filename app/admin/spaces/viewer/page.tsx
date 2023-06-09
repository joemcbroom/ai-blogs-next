// components
import AdminHeading from '#/components/admin/AdminHeading';
import SpacesViewer from '#/components/admin/spaces/SpacesViewer';
import supabase from '#/lib/supabase';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';

const getAllSpaces = async () => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(title, slug, description)`);
	if (error) throw error;

	return data as BlogSpaceWithPosts[];
};

export default async function SpacesPage() {
	const spaces = await getAllSpaces();

	return (
		<>
			<AdminHeading
				title="Space Viewer"
				subtitle="Select the Space you wish to edit"
			/>
			<SpacesViewer spaces={spaces} />
		</>
	);
}
