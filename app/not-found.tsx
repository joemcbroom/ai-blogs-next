/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function NotFound() {
	return (
		<>
			<div className="relative flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
				<img
					src="/images/404-bg-astronaut.png"
					alt="404"
					className="absolute inset-0 z-0 h-full w-full object-contain"
				/>

				<h2 className="z-10 text-center text-2xl capitalize text-neutral-100">
					Hmm... there doesn&apos;t seem to be anything here
				</h2>
				<Link
					href="/"
					className="z-10 my-2 rounded-lg bg-purple-600 px-3 py-2 text-neutral-100"
				>
					Head Home
				</Link>
			</div>
		</>
	);
}
