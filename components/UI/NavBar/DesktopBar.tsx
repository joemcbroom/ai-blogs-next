import BlogverseLogo from '../BlogverseLogo';
import NavLinks from './NavLinks';

const DesktopBar = () => (
	<div className="relative hidden items-center justify-between px-4 py-2 md:flex">
		<BlogverseLogo
			className="max-w-md rounded-lg pt-1 dark:bg-neutral-50"
			type="horizontal"
			width={200}
			height={45}
		/>
		<NavLinks />
	</div>
);

export default DesktopBar;
