const SUPABASE_CONSTANTS = {
	PUBLIC_BUCKET: 'blogverse-public',
	PRIVATE_BUCKET: 'blogverse-private',
	SPACE_IMAGES_PATH: 'space',
	POST_IMAGES_PATH: 'post',
	PUBLIC_URL(path: string) {
		return `https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/object/public/blogverse-public/${path}`;
	},
};

export default SUPABASE_CONSTANTS;
