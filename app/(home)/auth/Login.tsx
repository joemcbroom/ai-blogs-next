'use client';

// framework
import { useState } from 'react';

// library
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import IconLoader from '#/components/UI/loaders/IconLoader';
import ButtonComponent from '#/components/UI/ButtonComponent';

// hooks
import { useSupabase } from '#/lib/hooks/useSupabase';

type Inputs = {
	email: string;
};

const Login = () => {
	const { supabase } = useSupabase();
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setIsSubmitting(true);
		await handleLogin(data.email);
		setSubmitted(true);
		setIsSubmitting(false);
	};

	const handleLogin = async (email: string) => {
		const basePath = location.origin;
		await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${basePath}/auth`,
			},
		});
	};

	return (
		<>
			{submitted ? (
				<div className="flex h-screen flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Check your email!</h1>
					<p className="text-slate-500">
						We sent you a login link. Click it to log in.
					</p>
				</div>
			) : (
				// TODO - make this a card component https://github.com/joemcbroom/ai-blogs-next/issues/39
				<div className="flex h-screen flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Log in</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<input
							type="email"
							{...register('email', { required: true })}
							placeholder="Your email"
							disabled={isSubmitting}
							className="mt-2 w-[400px] rounded-md border border-slate-300 p-2 text-xs"
						/>
						<ButtonComponent type="submit" disabled={isSubmitting}>
							{isSubmitting ? <IconLoader /> : <span>Log in | Sign Up</span>}
						</ButtonComponent>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
