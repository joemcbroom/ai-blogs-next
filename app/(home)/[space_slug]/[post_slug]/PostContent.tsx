import PostHeaderImage from '#/components/UI/PostHeaderImage';
import ShareLinks from '#/components/UI/ShareLinks';
import AdComponent from '#/components/UI/ads/AdComponent';
import { supabase } from '#/lib/supabase/static';
import { Post } from '#/lib/types/inferred.types';
import { map } from '#/lib/utils/mapChildren';
import parse from 'html-react-parser';
import React, { ReactElement, ReactNode } from 'react';

interface HeaderImageProps {
	created_at: string;
	updated_at?: string | null;
	title: string;
	description: string | null;
	image_path: string | null;
	wordCount: number;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
	created_at,
	updated_at,
	title,
	description,
	image_path,
	wordCount,
}) => {
	let src = '';
	if (image_path) {
		const { data } = supabase.storage
			.from('blogverse-public')
			.getPublicUrl(image_path || '');
		src = data?.publicUrl || '';
	}

	// 7 February 2023
	const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	// 10 min read
	const readTime = Math.floor(wordCount / 200);
	const width = 1200;
	const height = 900;
	return (
		<header className="relative flex flex-col items-center justify-end bg-black bg-opacity-50">
			<PostHeaderImage
				path={image_path || ''}
				alt={title}
				className="absolute left-0 top-0 z-0 h-96 w-screen object-cover"
			/>
			<div className="z-10 flex h-96 w-full flex-col justify-end">
				<div className="w-full bg-gradient-to-b from-transparent to-black to-90%">
					<div className="relative mx-auto flex w-full flex-col justify-center gap-2 overflow-hidden p-6 md:max-w-4xl md:px-0">
						<div className="flex gap-2 text-sm font-semibold text-white">
							<span>{formattedDate}</span>
							<span>・</span>
							<span>{readTime} min read</span>
						</div>
						<h1 className="text-3xl font-bold text-white">{title}</h1>
						{/* {description && (
							<p className="text-xl font-semibold text-white">{description}</p>
						)} */}
					</div>
				</div>
			</div>
		</header>
	);
};

//@ts-expect-error https://github.com/microsoft/TypeScript/pull/51328
const PostContent: React.FC<Post> = ({ post }) => {
	const { created_at, title, description, image_path, content, space } = post;

	const removeDuplicateTitle = (content: string) => {
		// remove newlines and carriage returns
		content = content.replace(/(\r\n|\n|\r)/gm, '');
		// title is html so we should remove the title with surrounding tags
		const titleRegex = /<h1.*?>(.*?)<\/h1>/;
		const titleMatch = content.match(titleRegex);
		if (titleMatch) {
			const title = titleMatch[0];
			return content.replace(title, '');
		}
		return content;
	};

	const removeSpansAndPsFromListItems = (content: string) => {
		// convert spans and p tags from list items to text
		const listRegex = /<li.*?>(.*?)<\/li>/g;
		const listMatches = content.match(listRegex);
		if (listMatches) {
			for (const match of listMatches) {
				const spanRegex = /<span.*?>(.*?)<\/span>/g;
				const spanMatch = match.match(spanRegex);
				if (spanMatch) {
					for (const span of spanMatch) {
						const text = span.replace(/<\/?span.*?>/g, '');
						content = content.replace(span, text);
					}
				}
				const pRegex = /<p.*?>(.*?)<\/p>/g;
				const pMatch = match.match(pRegex);
				if (pMatch) {
					for (const p of pMatch) {
						const text = p.replace(/<\/?p.*?>/g, '');
						content = content.replace(p, text);
					}
				}
			}
		}
		return content;
	};

	const formattedContent = removeSpansAndPsFromListItems(
		removeDuplicateTitle(content || '')
	);

	const contentElements = parse(formattedContent) as ReactElement;

	const isValidForAds = (element: ReactNode) => {
		// element must be an html element
		// and not a list wrapper (ol, ul)
		// so valid elements are p, h1, h2, h3, h4, h5, h6, blockquote, pre, div, li
		if (typeof element === 'string') {
			return false;
		}
		const validElements = [
			'p',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'blockquote',
			'pre',
			'div',
			'li',
		];
		// @ts-expect-error
		return validElements.includes(element.type);
	};

	const ContentWithAds = () => {
		let index = 0;
		// after the first 3 elements, add an ad every 4th element
		return map(contentElements, (element) => {
			if (!isValidForAds(element)) {
				return element;
			}
			if (index > 3 && index % 4 === 0) {
				index++;
				return (
					<>
						<AdComponent />
						{element}
					</>
				);
			}
			index++;
			return element;
		});
	};

	return (
		<article className="">
			<HeaderImage
				created_at={created_at}
				title={title}
				description={description}
				image_path={image_path || space?.image_path || ''}
				wordCount={content?.split(' ').length || 0}
			/>
			{/* <LikesAndComments */}

			<section className="ProseMirror mx-auto max-w-4xl p-6 md:p-0 md:pt-6">
				<ContentWithAds />
			</section>
			<section className="mx-auto my-6 flex w-full max-w-4xl items-center justify-between border-y p-6 sm:justify-end sm:space-x-2">
				<span className="text-neutral-600">Share this post:</span>
				<ShareLinks />
			</section>
		</article>
	);
};

export default PostContent;
