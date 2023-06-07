// components
import AdminHeader from '#/components/UI/admin/AdminHeader';
import AdminNav from '#/components/UI/admin/AdminNav';

// types
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Admin route for Spaces',
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-full dark:bg-white dark:text-slate-900">
			<AdminNav />
			<div className="flex w-full flex-col">
				<AdminHeader />
				<section className="h-full px-16 py-10">{children}</section>
			</div>
		</div>
	);
}
