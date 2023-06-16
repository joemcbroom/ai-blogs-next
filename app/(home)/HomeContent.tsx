import Header from '#/components/UI/Header/Header';
import HeaderWrapper from '#/components/UI/Header/HeaderWrapper';
import PostHeaderImage from '#/components/UI/PostHeaderImage';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { supabase } from '#/lib/supabase/static';
import { BlogSpace, PostWithSpace } from '#/lib/types/inferred.types';
import Link from 'next/link';

interface HomeContentProps {
	spaces: BlogSpace[];
	featuredPosts: PostWithSpace[];
}
const HomeContent = async ({ spaces, featuredPosts }: HomeContentProps) => {
	return (
		<article>
			<Header
				created_at="2021-09-01T00:00:00.000Z"
				title="the future is now"
				description={SITE_INFO.tagLine}
				image_path="general/abstract-bg.jpg"
				variant="home"
			/>
			<section>stuff</section>
		</article>
	);
};

export default HomeContent;
