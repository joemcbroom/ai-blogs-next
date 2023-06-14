import { map } from 'react-itertools';
import parse from 'html-react-parser';
import { ReactElement, ReactNode } from 'react';
import AdComponent from '#/components/UI/ads/AdComponent';

const CHARACTER_COUNT_MODIFIER = 500;
const AD_FREQUENCY = 4;

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
		// so valid elements are p, blockquote, pre, div, li
		if (typeof element === 'string') {
			return false;
		}

		// if (element.type === 'li') {
		// 	return (
		// 		// @ts-expect-error
		// 		JSON.stringify(element?.props?.children).length >=
		// 		CHARACTER_COUNT_MODIFIER
		// 	);
		// }

		const validElements = ['p', 'blockquote', 'pre', 'div', 'li'];
		// @ts-expect-error
		return validElements.includes(element.type);
	};

	const isLongElement = (element: ReactNode) => {
		if (typeof element === 'string') {
			return false;
		}

		return (
			// @ts-expect-error
			JSON.stringify(element?.props?.children).length >=
			CHARACTER_COUNT_MODIFIER
		);
	};
	let index = 0;
	const mapFunction = (element: ReactNode) => {
		if (!isValidForAds(element)) {
			return element;
		}
		// skip the first 2 elements
		// and then add an ad every {AD_FREQUENCY} elements
		if (
			(index >= 2 && index % AD_FREQUENCY === 0) ||
			(index < 2 && isLongElement(element))
		) {
			index++;
			return (
				<>
					{element}
					<AdComponent />
				</>
			);
		}
		index++;
		return element;
	};
	return <>{map(contentElements, mapFunction)}</>;
};

export default ContentWithAds;
