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

/**
 * @swagger
 * /api/blog_space/generate:
 *   post:
 *     description: Create a new blog space
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the blog space
 *                 example: "Mountain Biking"
 *     responses:
 *       200:
 *         description: The blog space was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The id of the blog space
 *                     created_at:
 *                       type: string
 *                       description: The date the blog space was created
 *                     name:
 *                       type: string
 *                       description: The name of the blog space
 *                     slug:
 *                       type: string
 *                       description: The slug of the blog space
 *       400:
 *         description: The blog space already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: An error occurred
 */