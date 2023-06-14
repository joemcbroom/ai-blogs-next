'use client';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CardLinkProps {
	href: string;
	slug: string;
	isSpace: boolean;
}

const CardLink = ({ href, slug, isSpace }: CardLinkProps) => {
	const [card, setCardElement] = useState<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const router = useRouter();

	useEffect(() => {
		const card = document.getElementById(slug);
		setCardElement(card as HTMLDivElement);
	}, []);

	const handleLinkClick = () => {
		const imageElement = card?.querySelector('img');
		const textElement = card?.querySelector('.card-text');
		imageElement?.classList.remove('scale-100');
		imageElement?.classList.add('scale-110');
		textElement?.classList.remove('opacity-100');
		textElement?.classList.add('opacity-0');
		buttonRef.current?.classList.remove('opacity-100');
		buttonRef.current?.classList.add('opacity-0');

		setTimeout(() => {
			router.push(href);
		}, 300);
	};

	return (
		<button
			role="link"
			className="z-10 text-xs font-medium text-neutral-100 opacity-100 transition-opacity duration-500 hover:bg-neutral-50"
			onClick={() => handleLinkClick()}
			ref={buttonRef}
		>
			{isSpace ? (
				'View Space'
			) : (
				<>
					Read More <ArrowLongRightIcon className="inline-block h-4 w-4" />
				</>
			)}
		</button>
	);
};

export default CardLink;
