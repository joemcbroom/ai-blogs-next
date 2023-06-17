'use client';
import BlogverseLogo from '#/components/UI/BlogverseLogo';
import { useState } from 'react';
import addEmail from './subscribeAction';

const SubscribeBox = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setIsSubmitted(true);
	};

	return (
		<form
			action={addEmail}
			onSubmit={handleSubmit}
			className="flex w-full flex-col items-center justify-center space-y-4 md:grid md:grid-cols-2"
		>
			<div className="flex flex-col items-center justify-center space-y-4 md:px-10">
				<BlogverseLogo type="star" className="w-8 dark:hidden" />
				<BlogverseLogo type="whiteStar" className="hidden w-8 dark:block" />
				<p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
					Subscribe to learn about trending articles, latest posts, new spaces
					and more.
				</p>
			</div>
			<div className="flex w-full flex-col items-center justify-center space-y-4 md:px-10">
				{isSubmitted ? (
					<span>Thanks for subscribing!</span>
				) : (
					<>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="mt-4 w-full rounded-lg border border-transparent bg-neutral-100 px-4 py-2 text-sm text-neutral-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-transparent dark:focus:ring-purple-500"
						/>
						<button
							type="submit"
							className="mt-4 w-full rounded-full border border-transparent bg-purple-600 px-4 py-2 text-sm text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-purple-600 dark:text-white dark:focus:border-transparent dark:focus:ring-purple-500"
						>
							Subscribe
						</button>
					</>
				)}
			</div>
		</form>
	);
};

export default SubscribeBox;
