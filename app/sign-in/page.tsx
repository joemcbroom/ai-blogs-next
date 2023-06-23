// lib
import { userIsAdmin } from '#/lib/supabase/server';

// framework
import { redirect } from 'next/navigation';
import SignInContent from './SignInContent';

export default async function SignInPage() {
	const isAdmin = await userIsAdmin();
	console.log(isAdmin);

	if (isAdmin) {
		redirect('/admin');
	}

	//
	return <SignInContent />;
}
