import slugify from 'limax';
import supabase from 'lib/supabase';

const createBlogSpace = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

export default createBlogSpace;

