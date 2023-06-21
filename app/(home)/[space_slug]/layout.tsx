import AdminEdit from './AdminEdit';
import { getSpaceSlugs, supabase } from '#/lib/supabase/static';
import { Metadata } from 'next';
import { getSpace } from '#/lib/supabase/server';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';

export const revalidate = 360;

type Props = {
	params: { space_slug: string };
};

export async function generateMetadata({
	params: { space_slug },
}: Props): Promise<Metadata> {
	try {
		const space = await getSpace(space_slug);
		const { title, description } = space;
		return {
			title: `${title} | Blogverse.ai`,
			description,
			...OGTwitterMetadata({
				title,
				description: description || '',
				path: space_slug,
			}),
			// keywords: tags.join(', '), TODO: get tags
		};
	} catch (e) {
		return {
			title: `Blogverse.ai`,
			description: 'Blogverse.ai',
		};
	}
}

export const generateStaticParams = async () => {
	const slugs = await getSpaceSlugs();

	return slugs.map(({ slug }) => ({
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
