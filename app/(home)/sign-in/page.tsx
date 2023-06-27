// components
import Login from '#/app/auth/Login';

// lib
import { userIsAdmin } from '#/lib/supabase/server';

// framework
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignIn() {
	const isAdmin = await userIsAdmin();

	if (isAdmin) {
		redirect('/admin');
	}

	return <Login />;
}
