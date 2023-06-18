'use client';
import BlogverseLogo from '#/components/UI/BlogverseLogo';
import { useState } from 'react';
import addEmail from './subscribeAction';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex w-full flex-col items-center justify-center gap-6 border-gray-400 md:gap-4 md:px-6 last-of-type:md:border-l">
		{children}
	</div>
);

const SubscribeBox = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setIsSubmitted(true);
	};

	return (
		<form
			action={addEmail}
			onSubmit={handleSubmit}
			className="flex w-full flex-col items-center justify-center gap-6 md:grid md:grid-cols-2 md:gap-0"
		>
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
						<input
							type="email"
							name="email"
							placeholder="Email"
							className=" w-full rounded-lg border border-transparent bg-neutral-100 px-4 py-2 text-sm text-neutral-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-transparent dark:focus:ring-purple-500"
						/>
						<button
							type="submit"
							className=" w-full rounded-full border border-transparent bg-purple-600 px-4 py-2 text-sm text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-purple-600 dark:text-white dark:focus:border-transparent dark:focus:ring-purple-500"
						>
							Subscribe
						</button>
					</>
				)}
			</Wrapper>
		</form>
	);
};

export default SubscribeBox;
