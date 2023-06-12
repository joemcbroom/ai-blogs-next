import LoadingEditCard from '#/components/UI/loaders/LoadingEditCard';
import SearchInputLoader from '#/components/UI/loaders/SearchInputLoader';
import AdminHeading from '#/components/UI/admin/AdminHeading';
import CardsContainer from '#/components/UI/admin/EditCard/CardsContainer';

export default function SpacesViewerLoading() {
	return (
		<div className="mt-18 flex max-w-5xl flex-col gap-4">
			<AdminHeading title="Loading..." subtitle="Please wait..." />
			<SearchInputLoader />
			<CardsContainer>
				{[...Array(10)].map((_, i) => (
					<LoadingEditCard key={i} />
				))}
			</CardsContainer>
		</div>
	);
}