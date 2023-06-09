'use client';

import Link from 'next/link';
import { useSupabase } from '#/lib/hooks/useSupabase';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminEdit = () => {
	const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
	const { session, supabase } = useSupabase();
	const pathname = usePathname();
	const [space_slug, post_slug] = pathname.split('/').splice(1, 2);

	useEffect(() => {
		if (!session) return;
		const userIsAdmin = async (userId: string) => {
			const { data: isAdmin } = await supabase.rpc('is_admin', {
				user_id: userId,
			});

			setIsAdmin(isAdmin);
		};

		userIsAdmin(session.user.id);
	}, [pathname, session, supabase]);

	if (!session) {
		return null;
	}

	return (
		<>
			{isAdmin && (
				<div className="fixed bottom-1 right-1 flex flex-col rounded bg-white p-2 text-lg text-teal-800 shadow">
					{space_slug && (
						<Link href={`/admin/spaces/${space_slug}/edit`}>Edit Space</Link>
					)}
					{post_slug && space_slug && (
						<Link href={`/admin/posts/${post_slug}/edit`}>Edit Post</Link>
					)}
				</div>
			)}
		</>
	);
};

export default AdminEdit;
