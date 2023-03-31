// components
import AdminHeading from '#/components/admin/AdminHeading';
import SpacesViewer from '#/components/admin/spaces/SpacesViewer';
import { getAllSpaces } from '#/lib/supabase';

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
