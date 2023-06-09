import supabase from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function blogTagsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'GET':
			return getAllTags(req, res);
		case 'POST':
			return createTags(req, res);
		default:
			return res.status(405).json({ error: 'Method not allowed' });
	}
}

async function getAllTags(req: NextApiRequest, res: NextApiResponse) {
	const blogSpaceId = req.query.blog_space_id;

	const { data, error } = await supabase
		.from('tag')
		.select(`*`)
		.eq('blog_space_id', blogSpaceId);

	if (error) {
		res.status(500).json({ error: error.message });
		return;
	}

	res.status(200).json(data);
}

async function createTags(req: NextApiRequest, res: NextApiResponse) {
	// Max is 10
	// TODO: create tags with openai after integration
	const { qty } = req.query;
	if (Number(qty) > 10) {
		return res.status(400).json({ error: 'Max is 10' });
	}
	return res.status(200).json({ message: `create ${qty} tags` });
}
