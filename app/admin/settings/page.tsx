// components
import AdminHeading from '#/components/admin/AdminHeading';
import UserInfo from '#/components/admin/settings/UserInfo';

// lib
import { getProfile } from '#/lib/supabase/server';

export const revalidate = 0;

export default async function SettingsPage() {
	const userProfile = await getProfile();

	return (
		<>
			<AdminHeading title="Settings" subtitle="Change your settings" />
			<UserInfo userProfile={userProfile} />
		</>
	);
}
