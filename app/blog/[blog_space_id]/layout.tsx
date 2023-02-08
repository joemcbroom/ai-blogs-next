const getBlogSpace = async (blog_space_id: string) => {
	const res = await fetch(
		`http://localhost:3000/api/blog_space/${blog_space_id}`
	);
	if (!res.ok) throw new Error(res.statusText);
	const data = await res.json();
	return data;
};

export default async function BlogLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		blog_space_id: string;
	};
}) {
	const { blog_space_id } = params;
	const { primary_color, secondary_color, tertiary_color, ...blog } =
		await getBlogSpace(blog_space_id);

	const style = {
		'--primary-color': primary_color,
		'--secondary-color': secondary_color,
		'--tertiary-color': tertiary_color,
	} as React.CSSProperties;

	return (
		<>
			<style>{`
				:root {
					${Object.entries(style)
						.map(([key, value]) => `${key}: ${value};`)
						.join('')}
				}
			`}</style>
			<div className="flex flex-col items-center justify-center">
				<h1>{blog?.name}</h1>
				{children}
			</div>
		</>
	);
}
