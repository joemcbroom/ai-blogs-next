import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Option = {
	id: string;
	value: string;
};
type ListBoxProps = {
	options: Option[];
	changeHandler?: (id: string) => void;
	bgClass?: string;
	disabled?: boolean;
	widthClass?: string;
};
export default function SelectBox({
	options,
	changeHandler,
	bgClass = 'bg-pink-600',
	disabled = false,
	widthClass = 'w-full',
}: ListBoxProps) {
	const [selectedId, setSelectedId] = useState<string>(options[0].id);
	const [selected, setSelected] = useState<Option>(options[0]);

	useEffect(() => {
		const selectedOption = options.find((option) => option.id === selectedId);
		if (selectedOption) {
			setSelected(selectedOption);
			if (changeHandler) changeHandler(selectedId);
		}
	}, [selectedId, options, changeHandler]);

	const activeClass = `${bgClass} text-slate-50`;

	return (
		<div className={widthClass}>
			<Listbox value={selected.id} onChange={setSelectedId} disabled={disabled}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-700 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
						<span className="block truncate">{selected.value}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{options.map((option) => (
								<Listbox.Option
									key={option.id}
									className={({ active, selected }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active || selected ? activeClass : 'text-gray-900'
										}`
									}
									value={option.id}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${
													active || selected ? activeClass : 'font-normal'
												}`}
											>
												{option.value}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-50">
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
