interface AdminHeadingProps {
	title: string;
	subtitle: string;
}

export default function AdminHeading({ title, subtitle }: AdminHeadingProps) {
	if (!title) {
		throw new Error('AdminHeading requires a title');
	}
	return (
		<div>
			<h1 className="text-2xl font-bold">{title}</h1>
			{subtitle && <span className="text-sm">{subtitle}</span>}
		</div>
	);
}
