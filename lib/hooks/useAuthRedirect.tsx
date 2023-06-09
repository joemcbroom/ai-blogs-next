'use client';

import { useSupabase } from '#/lib/hooks/useSupabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuthRedirect = () => {
	const { supabase, session } = useSupabase();
	const [isAdmin, setIsAdmin] = useState(false);
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const checkIfUserIsAdmin = async () => {
			const { data: user, error } = await supabase
				.from('profiles')
				.select('is_admin')
				.eq('id', session?.user?.id)
				.single();
			if (error) {
				throw error;
			}
			setIsAdmin(user?.is_admin);
			setShouldRedirect(true);
		};

		if (session && !shouldRedirect) {
			checkIfUserIsAdmin();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session, supabase]);

	useEffect(() => {
		if (shouldRedirect) {
			router.push(isAdmin ? '/admin' : '/');
		}
	}, [shouldRedirect, isAdmin, router]);

	useEffect(() => {
		if (!session) {
			const redirectTimer = setTimeout(() => {
				setShouldRedirect(true);
			}, 5000);

			return () => clearTimeout(redirectTimer);
		}
	}, [session]);
};

export default useAuthRedirect;
