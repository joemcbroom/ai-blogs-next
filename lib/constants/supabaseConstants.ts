const SUPABASE_CONSTANTS = {
	PROJECT_ID: 'dyhumgxwuzsrinvjiefx',
	PUBLIC_BUCKET: 'blogverse-public',
	PRIVATE_BUCKET: 'blogverse-private',
	SPACE_IMAGES_PATH: 'space',
	POST_IMAGES_PATH: 'post',
	USER_IMAGES_PATH: 'user',
	PUBLIC_URL(path: string) {
		return `https://dyhumgxwuzsrinvjiefx.supabase.co/storage/v1/render/image/public/blogverse-public/${path}`;
	},
};

export default SUPABASE_CONSTANTS;
