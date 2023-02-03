import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function publishedPostsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'GET':
			return getPublishedPosts(req, res);
		default:
			return res.status(405).json({ error: 'Method not allowed' });
	}
}

async function getPublishedPosts(req: NextApiRequest, res: NextApiResponse) {
	const blogSpaceId = req.query.blog_space_id;

	const { data, error } = await supabase
		.from('post')
		.select(`*`)
		.eq('blog_space_id', blogSpaceId)
		.eq('is_draft', false);

	if (error) {
		res.status(500).json({ error: error.message });
		return;
	}

	res.status(200).json(data);
}