import { useEffect } from 'react';

type Props = React.InsHTMLAttributes<HTMLModElement>;
export default function AdUnit(props: Props) {
	useEffect(() => {
		try {
			if (window.hasOwnProperty('adsbygoogle')) {
				// @ts-ignore
				(adsbygoogle = window.adsbygoogle || []).push({});
			}
		} catch (e) {
			console.error('Could not initialize adsense ad block', e);
		}
	}, []);

	return <ins {...props}></ins>;
}
