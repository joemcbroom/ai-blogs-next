import supabase from 'lib/supabase';

/**
 * @swagger
 * /api/blog_space:
 *   get:
 *     description: Returns a list of blog spaces with their posts
 *     responses:
 *       200:
 *         description: Blog spaces with their posts
 *       500:
 *         description: Error
 */
const handler = async (_, res) => {
  const { data, error } = await supabase
    .from('blog_space')
    .select(`*, posts: post(title, slug, description)`)

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
}

export default handler;