import Link from 'next/link';

async function getBlogs() {
	const res = await fetch('http://localhost:3000/api/blog_space');

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	const data = await res.json();
	return data;
}

export default async function BlogsHome() {
	const blogs = await getBlogs();

	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Blog Home</h1>
			{blogs.map((blog) => (
				<Link
					href={`/blog/${blog.id}`}
					key={blog.id}
					className="border-2 w-[200px] p-4"
				>
					<h2>{blog.name}</h2>
				</Link>
			))}
		</div>
	);
}
