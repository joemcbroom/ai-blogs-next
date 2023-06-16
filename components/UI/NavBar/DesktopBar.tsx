import NavLinks from './NavLinks';
import NavLogo from './NavLogo';

const DesktopBar = () => (
	<div className="relative hidden items-center justify-between px-4 py-2 md:flex">
		<NavLogo width={200} height={45} />
		<NavLinks />
	</div>
);

export default DesktopBar;
