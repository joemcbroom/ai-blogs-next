// components
import Logout from '#/app/auth/Logout';

// lib
import { getAuthenticatedUser } from '#/lib/supabase/server';

export default async function Page() {
	const user = await getAuthenticatedUser();
	return (
		<>
			<h1 className="text-4xl font-bold">Home</h1>
			{user && <Logout />}
		</>
	);
}
