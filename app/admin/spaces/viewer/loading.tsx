import LoadingSpaceCard from '#/components/UI/loaders/LoadingSpaceCard';
import SearchInputLoader from '#/components/UI/loaders/SearchInputLoader';
import AdminHeading from '#/components/admin/AdminHeading';

export default function SpacesViewerLoading() {
	return (
		<div className="mt-18 flex max-w-5xl flex-col gap-4">
			<AdminHeading title="Loading..." subtitle="Please wait..." />
			<SearchInputLoader />
			<div className="mt-8 flex max-w-5xl flex-col gap-4">
				{[...Array(10)].map((_, i) => (
					<LoadingSpaceCard key={i} />
				))}
			</div>
		</div>
	);
}
