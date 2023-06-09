import SpaceEdit from '#/components/admin/spaces/SpaceEdit';

export default function EditSpace({ params }: { params: { slug: string } }) {
	return (
		<>
			<SpaceEdit slug={params.slug} />
		</>
	);
}
