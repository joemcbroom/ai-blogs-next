import { revalidatePath } from 'next/cache';

export const revalidatePaths = () => {
	revalidatePath('/');
	revalidatePath('/(home)/[space_slug]/[post_slug]');
	revalidatePath('/(home)/[space_slug]');
	revalidatePath('/(home)');
};
