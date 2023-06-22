'use client';
import BlogverseLogo from '#/components/UI/BlogverseLogo';
import { useRef, useState, useTransition } from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-full w-full flex-col items-center justify-center gap-6 border-gray-400 md:gap-4 md:px-6 last-of-type:md:border-l">
		{children}
	</div>
);

const SubscribeBox = () => {
	const [_, startTransition] = useTransition();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | undefined>('');

	const handleSubmit = () => {
		startTransition(async () => {
			const { value, validity } = emailRef.current || {};
			if (!value || !validity?.valid) return;

			const res = await fetch('/api/supabase/subscriber', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: value }),
			});
			const { error } = await res.json();
			if (error) {
				setError(error);
				return;
			}
			setIsSubmitted(true);
		});
	};

	return (
		<div className="-mx-6 flex h-full w-screen flex-col items-center justify-center gap-6 bg-slate-200 px-4 py-6 text-slate-500 dark:bg-slate-800 dark:text-slate-200 md:mx-0 md:grid md:w-full md:grid-cols-2 md:gap-0">
			<Wrapper>
				<BlogverseLogo type="star" className="w-8 dark:hidden" />
				<BlogverseLogo type="whiteStar" className="hidden w-8 dark:block" />
				<p className="px-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
					Subscribe to learn about trending articles, latest posts, new spaces
					and more.
				</p>
			</Wrapper>
			<Wrapper>
				{isSubmitted ? (
					<span>Thanks for subscribing!</span>
				) : (
					<>
						{error && <span className="text-red-500">{error}</span>}
						<div className="relative my-2 w-full">
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email Address"
								ref={emailRef}
								onChange={() => setError('')}
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleSubmit();
								}}
								className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-purple-600 focus:outline-none invalid:focus:border-red-500 dark:text-gray-300"
							/>
							<label
								htmlFor="email"
								className="absolute -top-3.5 left-0 cursor-text text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600 dark:text-gray-300 dark:peer-focus:text-gray-300"
							>
								Email address
							</label>
							<span className="invisible text-xs text-red-500 peer-invalid:visible dark:text-red-400">
								Invalid email
							</span>
							<button
								type="button"
								onClick={handleSubmit}
								className=" mt-1 w-full rounded-full border border-transparent bg-purple-600 px-4 py-2 text-sm text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 peer-placeholder-shown:pointer-events-none peer-placeholder-shown:opacity-75 peer-invalid:pointer-events-none peer-invalid:opacity-75 dark:bg-purple-600 dark:text-white dark:focus:border-transparent dark:focus:ring-purple-500"
							>
								Subscribe
							</button>
						</div>
					</>
				)}
			</Wrapper>
		</div>
	);
};

export default SubscribeBox;
