'use client';
import { Adsense } from '@ctrl/react-adsense';

const AdComponent = () => {
	return (
		<div className="mx-auto max-w-4xl p-6 md:p-0 md:pt-6">
			<div className="relative rounded-xl border-2 border-gray-300 p-4 dark:border-gray-700">
				<span className="absolute -top-2 left-4 bg-white px-2 text-xs uppercase text-neutral-600">
					Advertisement
				</span>
				<Adsense
					client="ca-pub-9658193107419462"
					slot="5397151271"
					layout="in-article"
					format="fluid"
					adTest="on"
				/>
			</div>
		</div>
	);
};

export default AdComponent;
