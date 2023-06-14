import { map } from 'react-itertools';
import parse from 'html-react-parser';
import { ReactElement, ReactNode } from 'react';
import AdComponent from '#/components/UI/ads/AdComponent';

const ContentWithAds = ({ content }: { content: string }) => {
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
	let index = 0;
	// after the first 3 elements, add an ad every 4th element
	return (
		<>
			{map(contentElements, (element) => {
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
			})}
		</>
	);
};

export default ContentWithAds;
