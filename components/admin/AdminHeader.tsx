'use client';

// components
import TypeWriter from '#/components/admin/TypeWriter';
import BlogverseLogo from '#/components/UI/BlogverseLogo';

export default function AdminHeader() {
	return (
		<div className="bg-slate-300 flex items-center gap-5 p-4">
			<BlogverseLogo
				type="star"
				className="bg-white rounded-full w-12 aspect-square p-1"
			/>
			<TypeWriter />
		</div>
	);
}
