import { createClient } from '@supabase/supabase-js';
import AdminEdit from './AdminEdit';
import { supabase } from '#/lib/supabase/static';
import { BlogSpace } from '#/lib/types/inferred.types';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const revalidate = 30;

const getSpace = async (space_slug: string) => {
	const { data: space, error } = await supabase
		.from('space')
		.select('*')
		.eq('slug', space_slug)
		.single();

	if (error) {
		console.error(error);
		throw error.message;
	}

	return space as BlogSpace;
};

type Props = {
	params: { space_slug: string };
};

export async function generateMetadata({
	params: { space_slug },
}: Props): Promise<Metadata> {
	const space = await getSpace(space_slug);
	const { title, description } = space;

	return {
		title: {
			template: `%s | Blogverse.ai`,
			default: title,
		},
		description,
		// keywords: tags.join(', '), TODO: get tags
	};
}

export const generateStaticParams = async () => {
	const { data, error } = await supabase
		.from('space')
		.select('slug')
		.eq('is_published', true);

	if (error) {
		console.error(error);
		throw error.message;
	}

	return data.map(({ slug }) => ({
		space_slug: slug,
	}));
};

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<AdminEdit />
		</>
	);
};

export default SpaceLayout;
