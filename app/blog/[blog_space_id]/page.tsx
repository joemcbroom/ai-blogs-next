const getBlogSpace = async (blog_space_id: string) => {
	const res = await fetch(
		`http://localhost:3000/api/blog_space/${blog_space_id}`
	);
	if (!res.ok) throw new Error(res.statusText);
	const data = await res.json();
	return data;
};

export default async function BlogPage({
	params,
}: {
	params: { blog_space_id: string };
}) {
	const { blog_space_id } = params;
	const blog = await getBlogSpace(blog_space_id);

	return (
		<div className="w-screen p-10">
			<div className="border-2 border-secondary bg-tertiary w-full text-center text-zinc-800 p-10">
				<h1>{blog?.name}</h1>
				<p>{blog.description}</p>
				<button className="bg-primary px-4 py-2 mx-2 rounded">Follow</button>
				<button className="bg-secondary text-zinc-800 px-4 py-2 mx-2 rounded text-">
					Unfollow
				</button>
			</div>
		</div>
	);
}
