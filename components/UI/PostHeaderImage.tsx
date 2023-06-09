/* eslint-disable @next/next/no-img-element */
'use client';

import { supabase } from '#/lib/supabase/client';
import { useLayoutEffect, useRef } from 'react';

interface PostHeaderImageProps {
	path: string;
	alt?: string;
	className?: string;
}

const PostHeaderImage = ({
	path,
	alt = '',
	className = '',
}: PostHeaderImageProps) => {
	path = path || 'post/space-background.jpg';
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
			/>
		</>
	);
};

export default PostHeaderImage;
