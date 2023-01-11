const BlogHome = ({ params }) => {
	const { blogName } = params;

	return <div>this is the home page for BLOG: {blogName}</div>;
};

export default BlogHome;
