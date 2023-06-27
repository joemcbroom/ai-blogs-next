import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: '*',
		allow: '/',
		disallow: ['/admin', '/sign-in'],
	},
});

export default robots;
