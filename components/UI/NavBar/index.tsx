import MobileBar from './MobileBar';
import DesktopBar from './DesktopBar';

const NavBar = () => {
	return (
		<nav className="sticky inset-0 z-40 bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 md:relative">
			<MobileBar />
			<DesktopBar />
		</nav>
	);
};

export default NavBar;
