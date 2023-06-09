const BlogHome = ({ params, children }) => {
	const { blogName } = params;

	return <div>this is the blog home page for {blogName}</div>;
};

export default BlogHome;
