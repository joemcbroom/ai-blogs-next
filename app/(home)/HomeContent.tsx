import Container from '#/components/UI/Container';
import Header from '#/components/UI/Header/Header';
import SubscribeBox from '#/components/UI/ads/Subscribe';
import CardWrapper from '#/components/UI/cards/CardWrapper';
import PostCard from '#/components/UI/cards/PostCard';
import ScrollCards from '#/components/UI/cards/ScrollCards';
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
				title="the future is now"
				description={SITE_INFO.tagLine}
				image_path="general/abstract-bg.jpg"
				variant="home"
			/>
			<Container>
				<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
					Spaces
				</h2>
				<ScrollCards items={spaces} />
			</Container>

			<Container>
				<div className="relative flex flex-col justify-center gap-2 overflow-hidden">
					<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
						Featured Posts
					</h2>

					<CardWrapper>
						{featuredPosts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</CardWrapper>
				</div>
			</Container>
			<Container>
				<SubscribeBox />
			</Container>
		</article>
	);
};

export default HomeContent;
