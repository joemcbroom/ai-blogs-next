/* eslint-disable @next/next/no-img-element */
import starLogoDark from '#/public/images/logos/logo-blogverse-star-wht.svg';
import starLogo from '#/public/images/logos/logo-blogverse-star.svg';

const LogoLoader = () => {
	return (
		<div className="grid h-full w-full place-items-center bg-transparent">
			<img
				src={starLogo.src}
				alt="Loading..."
				className="inline-block h-20 w-20 animate-ping dark:hidden"
			/>
			<img
				src={starLogoDark.src}
				alt="Loading..."
				className="hidden h-20 w-20 animate-ping dark:inline-block"
			/>
		</div>
	);
};

export default LogoLoader;
