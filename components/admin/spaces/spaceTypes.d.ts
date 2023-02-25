declare interface SpaceType {
	name: string;
	description: string;
	slug: string;
	created_at: string;
	updated_at: string;
	posts: {
		tile: string;
		slug: string;
		description: string;
	}[];
}
