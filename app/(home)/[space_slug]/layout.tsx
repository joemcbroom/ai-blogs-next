import { createClient } from '@supabase/supabase-js';
import AdminEdit from './AdminEdit';

export const dynamic = 'force-static';

export const revalidate = 30;

export const generateStaticParams = async () => {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
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
