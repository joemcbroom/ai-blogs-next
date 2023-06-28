'use client';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import AuthCard from '#/app/(home)/sign-in/AuthCard';
import { useRouter } from 'next/navigation';

const SignInDialog = () => {
	let [isOpen, setIsOpen] = useState(true);
	const router = useRouter();

	return (
		<Dialog
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
				router.back();
			}}
			className="relative z-50"
		>
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				{/* The actual dialog panel  */}
				<Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
					<AuthCard
						closeDialog={() => {
							router.refresh();
							setIsOpen(false);
						}}
					/>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default SignInDialog;
