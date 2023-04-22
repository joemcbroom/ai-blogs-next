'use client';
import ImgComponent from '#/components/UI/ImgComponent';
import Logout from '#/components/auth/Logout';
import { User } from '#/lib/types/inferred.types';

const UserInfo = ({ userProfile }: { userProfile: User }) => {
	const { full_name, email, avatar_url, is_admin } = userProfile;
	return (
		<div className="flex h-full flex-col items-start justify-start">
			{avatar_url && (
				<ImgComponent
					src={avatar_url}
					alt={full_name || 'User Avatar'}
					className="h-20 w-20 rounded-full"
				/>
			)}
			<h1 className="text-2xl font-bold">{full_name}</h1>
			<p className="text-gray-500">{email}</p>
			<p className="text-gray-500">{is_admin ? 'Admin' : 'User'}</p>
			<Logout />
		</div>
	);
};

export default UserInfo;
