const ArticleContentLoader = () => {
	return (
		<div className="mx-auto mt-6 max-w-8xl gap-4 px-4 md:px-0">
			{/* gray bars of various widths | skeleton loader */}
			<span className="h-4 w-40 rounded bg-gray-300" />
			<span className="h-4 w-40 rounded bg-gray-300" />
			<span className="h-4 w-60 rounded bg-gray-300" />
			<span className="h-4 w-40 rounded bg-gray-300" />
			<span className="h-4 w-80 rounded bg-gray-300" />
			<span className="h-4 w-80 rounded bg-gray-300" />
			<span className="h-4 w-40 rounded bg-gray-300" />
			<span className="h-4 w-60 rounded bg-gray-300" />
			<span className="h-4 w-40 rounded bg-gray-300" />
		</div>
	);
};

export default ArticleContentLoader;
