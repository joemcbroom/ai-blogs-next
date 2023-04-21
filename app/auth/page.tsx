import BlogverseLogo from '#/components/UI/BlogverseLogo';
import IconLoader from '#/components/UI/loaders/IconLoader';
import Authenticating from './Authenticating';

const Page = () => {
	return (
		<div className="grid h-screen w-screen place-items-center">
			<span className="flex flex-col items-center justify-center">
				<BlogverseLogo className="w-72" type="horizontal" />
				<IconLoader />
				<Authenticating />
			</span>
		</div>
	);
};

export default Page;
