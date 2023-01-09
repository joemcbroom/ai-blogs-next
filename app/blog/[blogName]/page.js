const BlogHome = ({ params, children }) => {
	const { blogName } = params;

	return <div>this is the home page for BLOG: {blogName}</div>;
};

export default BlogHome;
