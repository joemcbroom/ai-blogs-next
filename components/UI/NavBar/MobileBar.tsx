import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import BlogverseLogo from '../BlogverseLogo';
import NavLinks from './NavLinks';

const MobileBar = () => {
	return (
		<div className="relative z-50 flex items-center justify-between px-4 py-2 md:hidden">
			<BlogverseLogo
				className="z-50 w-1/3 rounded-lg pt-1 dark:hidden"
				type="horizontal"
				width={119}
				height={27}
			/>
			<BlogverseLogo
				className="z-50 hidden w-1/3 rounded-lg pt-1 dark:block"
				type="whiteHorizontal"
				width={119}
				height={27}
			/>
			<input
				type="checkbox"
				id="menu-toggle"
				className="peer/menu-toggle hidden"
			/>
			<label
				htmlFor="menu-toggle"
				className="right-4 top-4 z-50 block text-violet-700 peer-checked/menu-toggle:hidden"
			>
				<Bars3Icon className="h-6 w-6 " />
			</label>
			<label
				htmlFor="menu-toggle"
				className="right-4 top-4 z-50 hidden peer-checked/menu-toggle:fixed peer-checked/menu-toggle:block"
			>
				<XMarkIcon className="h-6 w-6 text-violet-700" />
			</label>
			{/* full height menu when menu-toggle is checked */}
			<div className="fixed left-0 top-0 z-40 grid h-screen w-screen -translate-y-full place-items-center bg-neutral-100 transition-all ease-in-out peer-checked/menu-toggle:z-30 peer-checked/menu-toggle:translate-y-0 dark:bg-neutral-900">
				<NavLinks />
			</div>
		</div>
	);
};

export default MobileBar;
