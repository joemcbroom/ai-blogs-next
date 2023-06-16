import Header from '#/components/UI/Header/Header';
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
				created_at="2021-09-01T00:00:00.000Z"
				title="the future is now"
				description={SITE_INFO.tagLine}
				image_path="general/abstract-bg.jpg"
				variant="home"
			/>
			<section className="mx-auto w-screen p-6 md:max-w-4xl md:px-0">
				<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
					Spaces
				</h2>
				<ScrollCards items={spaces} />
			</section>
			<section className="relative mx-auto flex w-full flex-col justify-center gap-2 overflow-hidden px-6 md:max-w-4xl md:px-0">
				<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
					Featured Posts
				</h2>
				<CardWrapper>
					{featuredPosts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</CardWrapper>
			</section>
		</article>
	);
};

export default HomeContent;
