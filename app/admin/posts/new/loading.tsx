import TextSkeletonLoader from '#/components/UI/loaders/TextSkeletonLoader';

// FYI : this is located in a "route group" https://beta.nextjs.org/docs/routing/defining-routes#route-groups
// As a workaround for the loader of the parent showing when a user clicks "edit post"
// the route group does not affect the url structure
export default function PostEditLoading() {
	return <TextSkeletonLoader />;
}
