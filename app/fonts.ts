import { Montserrat, Barlow_Condensed } from 'next/font/google';

export const MontserratFont = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});

export const BarlowCondensedFont = Barlow_Condensed({
	weight: '500',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-barlow-condensed',
});
