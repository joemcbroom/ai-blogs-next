'use client';
import { useSupabase } from '#/lib/hooks/useSupabase';
import googleLogo from '#/public/images/google-logo.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const AuthProviders = () => {
	const { supabase } = useSupabase();
	const currentPath = usePathname();
	const authCallbackUrl = `${window.location.origin}/api/auth/callback`;
	const redirect = `${currentPath}`;

	const redirectTo = `${authCallbackUrl}?redirect=${redirect}`;

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo,
			},
		});

		if (error) {
			console.log(error);
			return;
		}

		debugger;
	}

	return (
		<div>
			<button
				onClick={signInWithGoogle}
				className="w-12 rounded-full bg-white p-2 drop-shadow"
			>
				<Image src={googleLogo} alt="Google Logo" loader={({ src }) => src} />
				<span className="sr-only">Sign in with Google</span>
			</button>
		</div>
	);
};

export default AuthProviders;
