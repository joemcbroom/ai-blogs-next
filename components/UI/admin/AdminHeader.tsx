'use client';

// components
import TypeWriter from '#/components/UI/admin/TypeWriter';
import BlogverseLogo from '#/components/UI/BlogverseLogo';

export default function AdminHeader() {
	return (
		<div className="flex items-center gap-5 bg-slate-100 p-4">
			<div className="aspect-square w-12 rounded-full bg-white p-1">
				<BlogverseLogo type="star" className="svg-violet-700 " />
			</div>
			<TypeWriter />
		</div>
	);
}
