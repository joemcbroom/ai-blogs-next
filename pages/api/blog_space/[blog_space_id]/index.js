import supabase from 'lib/supabase';

export default async function blogSpaceHandler (req, res) {
  switch (req.method) {
    case 'GET':
      return getBlogSpace(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getBlogSpace (req, res) {
  const blogSpaceId = req.query.blog_space_id;

  const { data, error } = await supabase
    .from('blog_space')
    .select(`*, posts: post(title, slug, description)`)
    .eq('id', blogSpaceId);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
}