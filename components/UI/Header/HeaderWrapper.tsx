const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="z-10 flex h-full w-full flex-col justify-end">
			<div className="min-h-[50%] w-full bg-gradient-to-b from-transparent to-black to-90%">
				<div className="relative mx-auto flex w-full max-w-8xl flex-col justify-center gap-2 overflow-hidden p-6">
					{children}
				</div>
			</div>
		</div>
	);
};

export default HeaderWrapper;
