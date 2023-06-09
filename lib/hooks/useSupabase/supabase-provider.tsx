'use client';

import { createContext, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '#/lib/types/database.types';

type SupabaseContext = {
	supabase: SupabaseClient<Database>;
};

export const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [supabase] = useState(() => createBrowserSupabaseClient());
	const router = useRouter();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			router.refresh();
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [router, supabase]);

	return (
		<Context.Provider value={{ supabase }}>
			<>{children}</>
		</Context.Provider>
	);
}
