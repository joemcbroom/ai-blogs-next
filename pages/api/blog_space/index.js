import supabase from 'lib/supabase';
import slugify from 'limax';


export default async function blogSpaceHandler (req, res) {
  switch (req.method) {
    case 'GET':
      return getAllBlogSpaces(req, res);
    case 'POST':
      return createBlogSpace(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getAllBlogSpaces (_, res) {

  const { data, error } = await supabase
    .from('blog_space')
    .select(`*, posts: post(title, slug, description)`)

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
}

async function createBlogSpace (req, res) {

  const { name } = req?.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  const slug = slugify(name);

  const { count, error } = await supabase
    .from('blog_space')
    .select('*', { count: 'exact', head: true })
    .eq('slug', slug);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (count > 0) {
    return res.status(400).json({ error: 'Blog space already exists' });
  }

  const { data, error: insertError } = await supabase
    .from('blog_space')
    .insert({ name, slug })
    .select()

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  res.status(200).json({ data });
};