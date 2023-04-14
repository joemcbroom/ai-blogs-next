export default function LoadingCard() {
	return (
		<div className="mx-auto w-full rounded-md border border-blue-300 p-4 shadow">
			<div className="flex animate-pulse space-x-4">
				<div className="flex-1 space-y-6 py-1">
					<div className="space-y-3">
						<div className="grid grid-cols-4 gap-4">
							<div className="col-span-1 h-4 rounded bg-slate-700"></div>
						</div>
						<div className="grid grid-cols-8 items-center gap-4">
							<div className="col-span-1 h-2 rounded bg-slate-700"></div>
							<div className="col-span-1 col-start-6 h-2 rounded bg-slate-700"></div>
							<div className="col-span-1 col-start-7 h-2 rounded bg-slate-700"></div>
							<div className="col-span-1 col-start-8 h-5 rounded-full bg-pink-300"></div>
						</div>
						<div className="grid grid-cols-6 items-center gap-4">
							<div className="col-span-1 h-2 rounded bg-slate-700"></div>
							<div className="col-span-1 h-2 rounded bg-slate-700"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
