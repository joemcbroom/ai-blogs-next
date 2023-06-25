import { supabaseSingleton } from '#/lib/supabase/server';
import { redirect } from 'next/navigation';
import Logout from '../auth/Logout';

const AccountPage = async () => {
	const supabase = await supabaseSingleton();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect('/sign-in');
	}

	return (
		<div>
			<Logout />
		</div>
	);
};

export default AccountPage;
