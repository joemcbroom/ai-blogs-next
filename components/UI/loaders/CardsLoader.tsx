const CardsLoader = () => {
	return (
		<div className="mx-auto mt-6 grid max-w-4xl animate-pulse gap-4 px-4 md:grid-cols-auto-fit md:px-0">
			{[...Array(4)].map((_, i) => (
				<div
					className="relative flex min-h-[375px] flex-col items-start justify-end gap-2 overflow-hidden rounded-2xl bg-white p-4 shadow-xl"
					key={i}
				>
					<span className="absolute inset-0 z-0 bg-gradient-to-t from-neutral-900 to-transparent dark:from-purple-700 "></span>
					<div className="card-text relative w-full opacity-100 transition-opacity duration-500">
						<h3 className="text-base font-bold text-white">
							<span className="h-6 w-40 rounded bg-gray-300"></span>
						</h3>

						<p className="mt-4 text-center text-lg leading-6 text-neutral-200">
							<span className="h-4 w-40 rounded bg-gray-300"></span>
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardsLoader;
