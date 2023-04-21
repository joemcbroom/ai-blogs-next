import Login from '#/components/auth/Login';
import { userIsAdmin } from '#/lib/supabase/server';
import { redirect } from 'next/navigation';

const SignIn = async () => {
	const isAdmin = await userIsAdmin();

	if (isAdmin) {
		redirect('/admin');
	}

	return <Login />;
};

export default SignIn;
