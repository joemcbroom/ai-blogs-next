'use client';

import { useContext } from 'react';
import { Context } from '#/lib/hooks/useSupabase/supabase-provider';

export const useSupabase = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error('useSupabase must be used inside SupabaseProvider');
	}

	return context;
};
