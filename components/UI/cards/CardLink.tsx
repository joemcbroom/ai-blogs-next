'use client';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CardLinkProps {
	href: string;
	slug: string;
	isSpace: boolean;
	title: string;
	children?: React.ReactNode;
}

const CardLink = ({ href, slug, isSpace, title, children }: CardLinkProps) => {
	const [card, setCardElement] = useState<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLAnchorElement>(null);
	const router = useRouter();

	useEffect(() => {
		const card = document.getElementById(slug);
		setCardElement(card as HTMLDivElement);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<Link
			role="link"
			className="group z-10 flex h-full w-full items-end justify-start p-6 text-xs font-medium text-neutral-100 opacity-100 transition-opacity duration-500"
			onClick={() => handleLinkClick()}
			ref={buttonRef}
			href={href}
		>
			{isSpace ? (
				'View Space'
			) : (
				<span>
					{children}
					<span className="hover:bg-neutral-50 hover:text-neutral-800 group-hover:bg-neutral-50 group-hover:text-neutral-800">
						Read More <ArrowLongRightIcon className="inline-block h-4 w-4" />
					</span>
					<span className="sr-only">about {title}</span>
				</span>
			)}
		</Link>
	);
};

export default CardLink;
