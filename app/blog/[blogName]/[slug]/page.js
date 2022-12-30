const BlogPage = async ({ params }) => {
	const { blogName, slug } = params;
	const { title, content } = await fetchEntry({ blogName, slug });

	return (
		<div>
			<p>Title: {title}</p>
			<p>Content: {content}</p>
		</div>
	);
};

const fetchEntry = async ({ blogName, slug }) => {
	// get blog entries from DB
	const blogEntry = mockData[blogName].find(
		(blogEntry) => blogEntry.slug === slug
	);

	// TODO: figure out error boundry thing
	if (!blogEntry) {
		throw new Error('Failed to fetch data');
	}

	return blogEntry;
};

const mockData = {
	blog1: [
		{ slug: 'post1', title: 'Post 1', content: 'Post 1 content' },
		{ slug: 'post2', title: 'Post 2', content: 'Post 2 content' },
		{ slug: 'post3', title: 'Post 3', content: 'Post 3 content' },
	],
	blog2: [
		{ slug: 'post1', title: 'Post 1', content: 'Post 1 content' },
		{ slug: 'post2', title: 'Post 2', content: 'Post 2 content' },
		{ slug: 'post3', title: 'Post 3', content: 'Post 3 content' },
	],
	blog3: [
		{ slug: 'post1', title: 'Post 1', content: 'Post 1 content' },
		{ slug: 'post2', title: 'Post 2', content: 'Post 2 content' },
		{ slug: 'post3', title: 'Post 3', content: 'Post 3 content' },
	],
};

// Define all the possible blog entries - get slugs from DB by blogname
export const generateStaticParams = async ({ params: { blogName } }) => {
	// get blog entries from DB
	const blogEntries = mockData[blogName];
	const params = blogEntries.map((blogEntry) => ({
		blogName,
		slug: blogEntry.slug,
	}));
	console.log('params:\n', params);
	return params;
};

export default BlogPage;
