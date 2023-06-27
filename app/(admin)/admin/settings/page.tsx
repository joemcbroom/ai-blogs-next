// components
import AdminHeading from '#/components/UI/admin/AdminHeading';
import UserInfo from '#/app/(admin)/admin/settings/UserInfo';

// lib
import { getProfile } from '#/lib/supabase/server';

// types
import type { User } from '#/lib/types/inferred.types';

export const revalidate = 0;

export default async function SettingsPage() {
	const userProfile: User = await getProfile();

	return (
		<>
			<AdminHeading title="Settings" subtitle="Change your settings" />
			<UserInfo userProfile={userProfile} />
		</>
	);
}
