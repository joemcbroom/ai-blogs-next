// components
import AdminHeading from '#/components/UI/admin/AdminHeading';
import SpacesViewer from './SpacesViewer';

// lib
import { getAllSpaces } from '#/lib/supabase/server';

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
