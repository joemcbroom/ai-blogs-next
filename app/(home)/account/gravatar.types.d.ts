export interface GravatarProfile {
	id: string;
	hash: string;
	requestHash: string;
	profileUrl: string;
	preferredUsername: string;
	thumbnailUrl: string;
	photos?: PhotosEntity[] | null;
	name: Name;
	displayName: string;
	currentLocation: string;
	urls?: null[] | null;
}
interface PhotosEntity {
	value: string;
	type: string;
}
interface Name {
	givenName: string;
	familyName: string;
	formatted: string;
}
