import SpaceEdit from '#/components/admin/spaces/SpaceEdit';
import supabase from '#/lib/supabase';
import { BlogSpaceWithPosts } from '#/lib/types/inferred.types';

const getSpace = async (slug: string) => {
	const { data, error } = await supabase
		.from('blog_space')
		.select(`*, posts: post(*)`)
		.eq('slug', slug)
		.single();
	if (error) throw error;
	return data as BlogSpaceWithPosts;
};

export default async function EditSpace({
	params,
}: {
	params: { slug: string };
}) {
	const space = await getSpace(params.slug);
	return (
		<>
			<SpaceEdit space={space} />
		</>
	);
}
