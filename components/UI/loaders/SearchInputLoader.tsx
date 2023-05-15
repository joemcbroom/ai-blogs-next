import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchInputLoader({}) {
	return (
		<div className="relative flex max-w-max items-center overflow-hidden rounded-lg border-2 border-gray-300 text-gray-600">
			<input
				className="h-10 min-w-[20rem] bg-white px-5 text-sm focus:outline-none"
				type="text"
				name="search"
				placeholder="Search"
				disabled
			/>
			<button className="pr-2">
				<MagnifyingGlassIcon className="h-5 w-5 fill-current text-pink-600" />
			</button>
		</div>
	);
}
