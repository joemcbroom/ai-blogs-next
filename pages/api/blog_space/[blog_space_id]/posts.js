import supabase from 'lib/supabase';

export default async function blogPostsHandler (req, res) {
  switch (req.method) {
    case 'GET':
      return getAllPosts(req, res);
    case 'POST':
      return createPosts(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getAllPosts (req, res) {
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

async function createPosts (req, res) {
  console.log('create posts called');
}