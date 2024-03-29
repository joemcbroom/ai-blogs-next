'use client';

import { useEffect } from 'react';
import NavLinks from './NavLinks';
import { Bars2Icon } from '@heroicons/react/24/solid';

const MobileNavLinks = () => {
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const Hammer = require('hammerjs');

		const navWrapper: HTMLElement | null =
			document.getElementById('nav-wrapper');
		const menuToggle: HTMLElement | null =
			document.getElementById('menu-toggle');

		const mc = new Hammer(navWrapper);

		mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		mc.on('panup', function ({ distance }: { distance: number }) {
			navWrapper?.classList.remove('peer-checked/menu-toggle:translate-y-0');
			navWrapper?.style.setProperty('transform', `translateY(-${distance}px)`);
		});

		mc.on('panend', function (ev: any) {
			navWrapper?.style.removeProperty('transform');
			menuToggle?.click();
			navWrapper?.classList.add('peer-checked/menu-toggle:translate-y-0');
		});

		return () => {
			mc.destroy();
		};
	}, []);

	return (
		<div
			className="fixed left-0 top-0 z-40 grid h-screen w-screen -translate-y-full place-items-center bg-neutral-100 transition-all ease-in-out peer-checked/menu-toggle:z-30 peer-checked/menu-toggle:translate-y-0 dark:bg-neutral-900"
			id="nav-wrapper"
		>
			<NavLinks />
			<Bars2Icon
				className="h-12 absolute bottom-0 left-1/2 -ml-6 w-12 text-violet-700"
				onClick={() => document.getElementById('menu-toggle')?.click()}
			/>
		</div>
	);
};

export default MobileNavLinks;
