'use client';

import BlogverseLogo from '#/components/UI/BlogverseLogo';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import AuthProviders from './AuthProviders';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import { useSupabase } from '#/lib/hooks/useSupabase';
import Link from 'next/link';

const AuthCard = ({ closeDialog = () => {} }: { closeDialog?: () => void }) => {
	const emailRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string>('');
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const queryParams = useSearchParams();
	const { supabase } = useSupabase();

	const redirect = queryParams?.get('redirect') || '/';

	const handleSubmitMagicLink = async () => {
		const basePath = location.origin;
		const { value, validity } = emailRef.current || {};
		if (!value || !validity?.valid) return;
		const { error } = await supabase.auth.signInWithOtp({
			email: value,
			options: {
				emailRedirectTo: `${basePath}/api/auth/callback?redirect=${redirect}`,
			},
		});
		if (error) return setError(error.message);
		setIsSubmitted(true);
	};

	return (
		<div className="relative flex h-[30rem] w-full flex-col items-center rounded-lg bg-white p-8">
			<BlogverseLogo type="horizontal" width={400} />

			<div
				className={`absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 p-10 text-center transition-opacity duration-500 ${
					!isSubmitted ? 'opacity-0' : 'opacity-100'
				} `}
			>
				<h1 className="text-2xl font-bold">Check your email!</h1>
				<p className="text-slate-500">We sent you a Magic Link.</p>
				<p className="text-slate-500">Click it to complete sign up / log in.</p>
			</div>

			<div
				className={`absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 p-10 duration-500 ${
					isSubmitted ? 'opacity-0' : 'opacity-100'
				} duration-500`}
			>
				<span className="mt-20 text-slate-500">Register or Sign In</span>
				<div className="relative inline-flex w-full items-center justify-center">
					<hr className="my-6 h-px w-full border-0 bg-gray-200" />
					<span className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 bg-white px-1 text-xs font-medium text-gray-900">
						Magic Link
						<QuestionMarkCircleIcon
							className="inline-block h-4 w-4"
							data-tooltip-content={`Magic link is a form of passwordless login. You will receive an email with a link to log in OR sign up.`}
							data-tooltip-place="top"
							id="magicLinkTooltip"
						/>
					</span>
					<Tooltip
						anchorId="magicLinkTooltip"
						className="text-balance max-w-[200px] rounded-lg bg-gray-900 p-1 text-center text-xs text-white"
					/>
				</div>
				<div className="relative w-full">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email Address"
						ref={emailRef}
						onChange={() => setError('')}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSubmitMagicLink();
						}}
						className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-purple-600 focus:outline-none invalid:focus:border-red-500"
					/>
					{error && <span className="text-xs text-red-500">{error}</span>}
					<label
						htmlFor="email"
						className="absolute -top-3.5 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
					>
						Email address
					</label>
					<span className="invisible text-xs text-red-500 peer-invalid:visible">
						Invalid email
					</span>
					<button
						type="button"
						onClick={handleSubmitMagicLink}
						className="mx-auto mt-1 block w-full rounded-full border border-transparent bg-purple-900 px-4 py-2 text-sm text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 peer-placeholder-shown:pointer-events-none peer-placeholder-shown:opacity-75 peer-invalid:pointer-events-none peer-invalid:opacity-75"
					>
						Log In / Sign Up
					</button>
				</div>
				<div className="relative inline-flex w-full items-center justify-center">
					<hr className="my-6 h-px w-full border-0 bg-gray-200" />
					<span className="absolute left-1/2 -translate-x-1/2 bg-white px-1 text-xs font-medium text-gray-900">
						Or continue with
					</span>
				</div>
				<AuthProviders />
				<Link
					className="mt-2 text-purple-700 underline"
					href="/"
					onClick={closeDialog}
				>
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default AuthCard;
