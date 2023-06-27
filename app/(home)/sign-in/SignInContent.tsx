'use client';
// components
import { useSupabase } from '#/lib/hooks/useSupabase';

// framework
import AuthCard from './AuthCard';
import Container from '#/components/UI/containers/Container';
import { redirect } from 'next/navigation';

const SignInContent = () => {
	const { session } = useSupabase();

	if (session) {
		redirect('/account');
	}

	return (
		<div className="fixed left-0 top-0 z-50 grid h-screen w-screen bg-black bg-[url('/images/abstract-bg.jpg')] bg-cover bg-center bg-no-repeat">
			<Container>
				<div className="flex h-full w-full flex-col-reverse items-center justify-center md:flex-row md:justify-between">
					<div className="w-full md:w-7/12">
						<span className="text-4xl font-bold text-white md:text-8xl md:[word-spacing:100vw] lg:text-9xl">
							the future is now
						</span>
					</div>
					<div className="w-full md:w-5/12">
						<AuthCard />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default SignInContent;
