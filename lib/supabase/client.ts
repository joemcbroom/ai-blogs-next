import { createClient } from '@supabase/supabase-js';
import { DB } from '#/lib/types/inferred.types';

export const supabase = createClient<DB>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseStorage = {
	upload: async ({
		file,
		bucket,
		path,
	}: {
		file: File;
		bucket: string;
		path: string;
	}): Promise<string> => {
		let data;
		let error;

		({ data, error } = await supabase.storage.from(bucket).upload(path, file, {
			cacheControl: '3600',
		}));

		if (error) throw error;
		return data!.path;
	},
	download: async ({ bucket, path }: { bucket: string; path: string }) => {
		const { data, error } = await supabase.storage.from(bucket).download(path);
		if (error) throw error;
		return data;
	},
	getPublicUrl: ({ bucket, path }: { bucket: string; path: string }) => {
		const {
			data: { publicUrl },
		} = supabase.storage.from(bucket).getPublicUrl(path);
		return publicUrl;
	},
	delete: async ({ bucket, paths }: { bucket: string; paths: string[] }) => {
		const { error } = await supabase.storage.from(bucket).remove(paths);
		if (error) throw error;
	},
};
