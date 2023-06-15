const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto my-6 grid max-w-4xl gap-4 px-4 md:grid-cols-auto-fit md:px-0">
			{children}
		</div>
	);
};

export default CardWrapper;
