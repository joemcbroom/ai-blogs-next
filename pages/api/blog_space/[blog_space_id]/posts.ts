import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function blogPostsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'GET':
			return getAllPosts(req, res);
		case 'POST':
			return createPosts(req, res);
		default:
			return res.status(405).json({ error: 'Method not allowed' });
	}
}

async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
	const blogSpaceId = req.query.blog_space_id;

	const { data, error } = await supabase
		.from('post')
		.select(`*`)
		.eq('blog_space_id', blogSpaceId);

	if (error) {
		res.status(500).json({ error: error.message });
		return;
	}

	res.status(200).json(data);
}

async function createPosts(req: NextApiRequest, res: NextApiResponse) {
	// Max is 10
	// TODO: create posts with openai after integration
	const { qty } = req.query;

	if (Number(qty) > 10) {
		return res.status(400).json({ error: 'Max is 10' });
	}
	return res.status(200).json({ message: `create ${qty} posts` });
}
