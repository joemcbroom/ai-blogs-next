import Container from '#/components/UI/containers/Container';
import Header from '#/components/UI/Header/Header';
import SubscribeBox from '#/components/UI/ads/Subscribe';
import CardWrapper from '#/components/UI/cards/CardWrapper';
import PostCard from '#/components/UI/cards/PostCard';
import ScrollCards from '#/components/UI/cards/ScrollCards';
import Heading from '#/components/UI/headings/Heading';
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
				<Heading>Spaces</Heading>
				<ScrollCards items={spaces} />
			</Container>

			<Container>
				<div className="relative flex flex-col justify-center gap-2 overflow-hidden">
					<Heading variant="h2">Featured Posts</Heading>

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
