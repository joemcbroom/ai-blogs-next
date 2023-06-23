/* eslint-disable @next/next/no-img-element */
import starLogoDark from '#/public/images/logos/logo-blogverse-star-wht.svg';
import starLogo from '#/public/images/logos/logo-blogverse-star.svg';
import Image from 'next/image';

const LogoLoader = () => {
	return (
		<div className="grid h-full w-full place-items-center bg-transparent">
			<Image
				src={starLogo}
				alt="Loading..."
				className="inline-block h-20 w-20 animate-ping dark:hidden"
			/>
			<Image
				src={starLogoDark}
				alt="Loading..."
				className="hidden h-20 w-20 animate-ping dark:inline-block"
			/>
		</div>
	);
};

export default LogoLoader;
