'use client';

import supabase from '#/lib/supabase';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditSpace() {
	const router = useRouter();
	const { slug } = router.query;
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
