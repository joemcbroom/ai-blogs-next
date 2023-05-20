// components
import SpaceEdit from '#/app/admin/spaces/viewer/(viewer)/[slug]/edit/SpaceEdit';

// lib
import { getSpace } from '#/lib/supabase/server';

export const revalidate = 0;

export default async function EditSpace({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const space = await getSpace(slug);
	return (
		<>
			<SpaceEdit space={space} />
		</>
	);
}
