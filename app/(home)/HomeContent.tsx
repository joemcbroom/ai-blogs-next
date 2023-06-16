import Header from '#/components/UI/Header/Header';
import { SITE_INFO } from '#/lib/constants/siteInfo';
import { BlogSpace, PostWithSpace } from '#/lib/types/inferred.types';

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
