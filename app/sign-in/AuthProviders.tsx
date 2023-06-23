'use client';
import { supabase } from '#/lib/supabase/client';
import googleLogo from '#/public/images/google-logo.png';
import Image from 'next/image';

const AuthProviders = () => {
	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
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
			</button>
		</div>
	);
};

export default AuthProviders;
