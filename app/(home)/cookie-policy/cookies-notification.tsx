'use client';

import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CookiesNotification = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (window.localStorage.getItem('cookies-consent') !== 'true') {
			setShow(true);
		}
	}, []);

	const dismiss = () => {
		document.cookie = 'cookies-notification=1;path=/;max-age=31536000';
		setShow(false);
		window.localStorage.setItem('cookies-consent', 'true');
	};

	return (
		show && (
			<div className="text-balance fixed bottom-0 left-0 z-50 w-full bg-slate-800 px-10 py-5 text-slate-50 dark:bg-neutral-100 dark:text-slate-800 md:pr-10">
				<div className="container flex items-center justify-between gap-2 py-2">
					<p className="text-sm">
						We use cookies to improve your experience on our site. By using our
						site, you consent to our{' '}
						<Link className="underline" href="/cookie-policy">
							Cookie Policy
						</Link>
						.
					</p>
					<button
						className="rounded bg-neutral-200 p-1 px-2 py-1 text-neutral-800"
						onClick={dismiss}
					>
						<span className="sr-only">Dismiss</span>
						{/* <XMarkIcon className="h-5 w-5" /> */}
						Got it
					</button>
				</div>
			</div>
		)
	);
};

export default CookiesNotification;
