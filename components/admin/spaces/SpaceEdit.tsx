'use client';
import { useEffect, useState } from 'react';
import supabase from '#/lib/supabase';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { BlogSpace, BlogSpaceWithPosts } from '#/lib/types/inferred.types';

export default function SpaceEdit({ slug }: { slug: string }) {
	const [space, setSpace] = useState<BlogSpaceWithPosts>();

	useEffect(() => {
		if (!slug) return;
		const getSpace = async () => {
			const { data, error } = await supabase
				.from('blog_space')
				.select(`*, posts: post(*)`)
				.eq('slug', slug)
				.single();
			if (error) throw error;
			setSpace(data as BlogSpaceWithPosts);
		};
		getSpace();
	}, [slug]);

	return (
		<>
			<Link href={`/admin/spaces/viewer/`} className="flex">
				<ChevronLeftIcon className="h-6 w-6" />
				<span>Back</span>
			</Link>
			{space &&
				Object.keys(space).map((key) => {
					const value = space[key as keyof BlogSpace];
					return (
						<div key={key}>
							<span>{key}</span>
							<span> {`'${value}'`}</span>
						</div>
					);
				})}
		</>
	);
}
