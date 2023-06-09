// components
import Login from '#/components/auth/Login';

// lib
import { userIsAdmin } from '#/lib/supabase/server';

// framework
import { redirect } from 'next/navigation';

export default async function SignIn() {
	const isAdmin = await userIsAdmin();

	if (isAdmin) {
		redirect('/admin');
	}

	return <Login />;
}
