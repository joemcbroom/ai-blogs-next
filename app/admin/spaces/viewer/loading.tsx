import LoadingCard from '#/components/UI/loaders/LoadingCard';

export default function Loading() {
	return (
		<div className="mt-18 flex flex-col gap-4">
			{[...Array(10)].map((_, i) => (
				<LoadingCard key={i} />
			))}
		</div>
	);
}
