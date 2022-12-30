const BlogLayout = ({ params, children }) => {
	const { blogName } = params;
	return (
		<>
			<h1> Blog Name: {blogName}</h1>
			{children}
		</>
	);
};

// Define all the posible blog names (get from DB)
export const generateStaticParams = () => {
	const blogNames = ['blog1', 'blog2', 'blog3'];

	return blogNames.map((blogName) => ({ blogName }));
};

export default BlogLayout;
