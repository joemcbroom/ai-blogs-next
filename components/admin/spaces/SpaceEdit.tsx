'use client';
import { useEffect, useState } from 'react';
import supabase from '#/lib/supabase';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export default function SpaceEdit({ slug }: { slug: string }) {
	const [space, setSpace] = useState<SpaceType>();

	useEffect(() => {
		if (!slug) return;
		const getSpace = async () => {
			const { data, error } = await supabase
				.from('blog_space')
				.select(`*, posts: post(*)`)
				.eq('slug', slug)
				.single();
			if (error) throw error;
			setSpace(data);
		};
		getSpace();
	}, [slug]);

	return (
		<>
			<Link href={`/admin/spaces/viewer/`}>
				<ChevronLeftIcon className="h-6 w-6" />
				<span>Back</span>
			</Link>
		</>
	);
}
