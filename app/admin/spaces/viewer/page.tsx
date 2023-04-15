// components
import AdminHeading from '#/components/admin/AdminHeading';
import SpacesViewer from '#/components/admin/spaces/SpacesViewer';
// lib
import { getAllSpaces } from '#/lib/requestHelpers/supabase-server';

export const revalidate = 0;

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
