/* eslint-disable @next/next/no-img-element */
import ArticleContentLoader from '#/components/UI/loaders/ArticleContentLoader';
import ContentHeaderLoader from '#/components/UI/loaders/ContentHeaderLoader';

export default function PostLoading() {
	return (
		<article>
			<ContentHeaderLoader />
			<ArticleContentLoader />
		</article>
	);
}
