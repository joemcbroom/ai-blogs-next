'use client';

import { ADSENSE_CLIENT_ID, IN_ARTICLE_AD_SLOT } from '#/lib/constants/adsense';
import AdUnit from './AdUnit';
import Adsense from './Adsense';

const AdComponent = () => {
	return (
		<div className="ad-component mx-auto max-w-4xl py-4">
			<div className="relative min-h-[100px] rounded-xl border-2 border-gray-300 p-4 dark:border-gray-700">
				<span className="absolute -top-2 left-4 bg-white px-2 text-xs uppercase text-neutral-600 dark:bg-black">
					Advertisement
				</span>
				<Adsense client_id={ADSENSE_CLIENT_ID} />
				<AdUnit
					className="adsbygoogle block text-center"
					data-ad-client={ADSENSE_CLIENT_ID}
					data-ad-slot={IN_ARTICLE_AD_SLOT}
					data-ad-layout="in-article"
					data-ad-format="fluid"
				/>
			</div>
		</div>
	);
};

export default AdComponent;
