'use server';
import { supabaseSingleton } from '#/lib/supabase/server';

export default async function addEmail(data: FormData) {
	const email = data.get('email');
	const supabase = await supabaseSingleton();
	const { error } = await supabase.from('subscribers').insert({ email });
	if (error) {
		console.error(error);
	}
}
