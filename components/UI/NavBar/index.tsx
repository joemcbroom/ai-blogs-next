import MobileBar from './MobileBar';
import DesktopBar from './DesktopBar';

const NavBar = () => {
	return (
		<nav className="relative bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
			<MobileBar />
			<DesktopBar />
		</nav>
	);
};

export default NavBar;
