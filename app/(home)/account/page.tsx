import { getProfile } from '#/lib/supabase/server';
import { createHash } from 'crypto';
import AccountContent from './AccountContent';

const getGravatarProfile = async (email: string | null) => {
	if (!email) return { gravatarProfile: null };
	try {
		const gravatarHash =
			email &&
			createHash('md5').update(email.trim().toLowerCase()).digest('hex');
		const res = await fetch(`https://www.gravatar.com/${gravatarHash}.json`);
		const profile = await res.json();
		return { gravatarProfile: profile?.entry[0] };
	} catch (error) {
		console.error(error);
		return { error };
	}
};

const AccountPage = async () => {
	const user = await getProfile();
	const { gravatarProfile, error } = await getGravatarProfile(user?.email);
	if (error) console.error(error);
	return <AccountContent user={user} gravatarProfile={gravatarProfile} />;
};

export default AccountPage;
