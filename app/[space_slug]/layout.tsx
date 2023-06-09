import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-static';

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
	return <>{children}</>;
};

export default SpaceLayout;
