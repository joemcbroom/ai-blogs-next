import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchInputProps {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
}

export default function SearchInput({
	searchQuery,
	setSearchQuery,
}: SearchInputProps) {
	return (
		<div className="relative max-w-max pt-2 text-gray-600">
			<input
				className="h-10 min-w-[24rem] rounded-lg border-2 border-gray-300 bg-white px-5 pr-6 text-sm focus:outline-none"
				type="search"
				name="search"
				placeholder="Search"
				onChange={(e) => setSearchQuery(e.target.value)}
				value={searchQuery}
			/>
			<button className="absolute right-0 top-0 mt-5 mr-2">
				<MagnifyingGlassIcon className="h-4 w-4 fill-current text-gray-600" />
			</button>
		</div>
	);
}
