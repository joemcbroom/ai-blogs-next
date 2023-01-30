// types
import { AdminHeadingProps } from '#/lib/ComponentProps';

export default function AdminHeading({ title, subtitle } : AdminHeadingProps) {
	if (!title) {
		throw new Error('AdminHeading requires a title');
	}
	return (
		<>
			<h1 className="text-2xl font-bold">{title}</h1>
			{subtitle && <span>{subtitle}</span>}
		</>
	);
}
