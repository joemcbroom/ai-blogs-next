const CenteredContent = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-screen flex-col items-center justify-center px-4">
		{children}
	</div>
);

export default CenteredContent;
