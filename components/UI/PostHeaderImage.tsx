/* eslint-disable @next/next/no-img-element */
'use client';

import { supabase } from '#/lib/supabase/client';
import { useLayoutEffect, useRef } from 'react';

interface PostHeaderImageProps {
	path: string;
	alt?: string;
}

const PostHeaderImage = ({ path, alt = '' }: PostHeaderImageProps) => {
	const fullImage = useRef<HTMLImageElement>(null);
	const placeHolderImage = useRef<HTMLImageElement>(null);

	const onLoaded = () => {
		if (fullImage.current && placeHolderImage.current) {
			fullImage.current.classList.remove('opacity-0');
			fullImage.current.classList.add('opacity-100');
			placeHolderImage.current.classList.add('opacity-0');
		}
	};
	const { data: placeHolderSrc } = supabase.storage
		.from('blogverse-public')
		.getPublicUrl(path, {
			transform: {
				width: 10,
				height: 10,
				resize: 'cover',
			},
		});
	const { data: fullSrc } = supabase.storage
		.from('blogverse-public')
		.getPublicUrl(path, {
			transform: {
				width: 1200,
				height: 900,
				resize: 'cover',
			},
		});

	const { data: smallSrc } = supabase.storage
		.from('blogverse-public')
		.getPublicUrl(path, {
			transform: {
				width: 600,
				height: 450,
				resize: 'cover',
			},
		});

	useLayoutEffect(() => {
		const image = fullImage.current;
		if (image) {
			if (image.complete) {
				return onLoaded();
			}
			image.addEventListener('load', onLoaded);
		}
		return () => {
			if (image) {
				image.removeEventListener('load', onLoaded);
			}
		};
	}, []);

	const className = 'absolute left-0 top-0 z-0 h-full w-screen object-cover';

	if (!path) {
		return (
			<div
				className={`${className} bg-gradient-to-b from-pink-600 to-sky-400  `}
			/>
		);
	}

	return (
		<>
			<img
				ref={placeHolderImage}
				src={placeHolderSrc.publicUrl}
				alt={alt}
				className={`${className} opacity-100 transition-opacity`}
			/>
			<img
				ref={fullImage}
				src={fullSrc.publicUrl}
				alt={alt}
				className={`${className} opacity-0 transition-opacity`}
				srcSet={`${smallSrc.publicUrl} 600w, ${fullSrc.publicUrl} 1200w`}
				sizes="(max-width: 500px) 50vw, 1200px"
			/>
		</>
	);
};

export default PostHeaderImage;
