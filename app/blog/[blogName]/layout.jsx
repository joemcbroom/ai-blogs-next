const BlogLayout = ({ params, children }) => <>{children}</>;

// Define all the posible blog names (get from DB)
export const generateStaticParams = () => {
	const blogNames = ['blog1', 'blog2', 'blog3'];

	return blogNames.map((blogName) => ({ blogName }));
};

export default BlogLayout;
