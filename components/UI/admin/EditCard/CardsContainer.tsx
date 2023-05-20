export default function CardsContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="mt-8 flex max-w-5xl flex-col gap-4">{children}</div>;
}
