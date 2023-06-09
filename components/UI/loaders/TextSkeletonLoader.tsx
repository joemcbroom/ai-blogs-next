export default function TextSkeletonLoader() {
	return (
		// <div role="status" className="mt-6 max-w-lg animate-pulse space-y-2.5">
		// 	<div className="flex w-full items-center space-x-2">
		// 		<div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
		// 		<div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 	</div>
		// 	<div className="flex w-full max-w-[480px] items-center space-x-2">
		// 		<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 	</div>
		// 	<div className="flex w-full max-w-[400px] items-center space-x-2">
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 	</div>
		// 	<div className="flex w-full max-w-[480px] items-center space-x-2">
		// 		<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 	</div>
		// 	<div className="flex w-full max-w-[440px] items-center space-x-2">
		// 		<div className="h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
		// 	</div>
		// 	<div className="flex w-full max-w-[360px] items-center space-x-2">
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 		<div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
		// 		<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
		// 	</div>
		// 	<span className="sr-only">Loading...</span>
		// </div>

		<div role="status" className="max-w-sm animate-pulse">
			<div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
