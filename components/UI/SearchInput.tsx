import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface SearchInputProps {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
}

export default function SearchInput({
	searchQuery,
	setSearchQuery,
}: SearchInputProps) {
	return (
		<div className="relative flex max-w-max items-center overflow-hidden rounded-lg border-2 border-gray-300 text-gray-600">
			<input
				className="h-10 min-w-[20rem] bg-white px-5 text-sm focus:outline-none"
				type="text"
				name="search"
				placeholder="Search"
				onChange={(e) => setSearchQuery(e.target.value)}
				value={searchQuery}
			/>
			<button className="pr-2">
				{searchQuery.length === 0 ? (
					<MagnifyingGlassIcon className="h-5 w-5 fill-current text-pink-600" />
				) : (
					<XMarkIcon
						className="h-4 w-4 fill-current text-gray-600"
						onClick={() => setSearchQuery('')}
					/>
				)}
			</button>
		</div>
	);
}
