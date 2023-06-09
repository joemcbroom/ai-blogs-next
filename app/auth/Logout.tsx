'use client';

// components
import ButtonComponent from '#/components/UI/ButtonComponent';

// hooks
import { useSupabase } from '#/lib/hooks/useSupabase';

export default function Logout() {
	const { supabase } = useSupabase();
	return (
		<ButtonComponent onClick={() => supabase.auth.signOut()}>
			Logout
		</ButtonComponent>
	);
}
