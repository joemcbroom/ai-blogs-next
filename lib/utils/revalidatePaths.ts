import { revalidatePath } from 'next/cache';

export const revalidatePaths = () => {
	revalidatePath('/');
	revalidatePath('/[space_slug]/[post_slug]');
	revalidatePath('/[space_slug]');
	revalidatePath('/');
};
