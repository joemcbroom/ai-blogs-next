'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
	Session,
	createClientComponentClient,
	createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';
import { usePathname, useRouter } from 'next/navigation';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '#/lib/types/database.types';

type SupabaseContext = {
	supabase: SupabaseClient<Database>;
	session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export const SupabaseProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [supabase] = useState(() => createClientComponentClient());
	const [session, setSession] = useState<Session | null>(null);
	const router = useRouter();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
			if (event === 'SIGNED_OUT') {
				console.log('signed out');
				router.push('/');
			}
			router.refresh();
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [router, supabase]);

	return (
		<Context.Provider value={{ supabase, session }}>
			<>{children}</>
		</Context.Provider>
	);
};

export const useSupabase = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error('useSupabase must be used inside SupabaseProvider');
	}
	return context;
};
