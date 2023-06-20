'use server';
import { supabaseSingleton } from '#/lib/supabase/server';

export default async function addEmail(email: string) {
	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('subscribers').insert({ email });
	if (error) {
		console.error(error);
		if (error.message.includes('check constraint')) {
			return { error: 'Invalid Email' };
		} else if (error.message.includes('unique constraint')) {
			return { error: 'Email already exists' };
		}
	}
	return { success: true };
}
