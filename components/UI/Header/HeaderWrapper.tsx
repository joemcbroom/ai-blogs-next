const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="z-10 flex h-full w-full flex-col justify-end">
			<div className="w-full bg-gradient-to-b from-transparent to-black to-90%">
				<div className="relative mx-auto flex w-full flex-col justify-center gap-2 overflow-hidden p-6 lg:max-w-4xl lg:px-0">
					{children}
				</div>
			</div>
		</div>
	);
};

export default HeaderWrapper;
