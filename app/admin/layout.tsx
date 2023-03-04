// components
import AdminHeader from '#/components/admin/AdminHeader';
import AdminNav from '#/components/admin/AdminNav';

// framework
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Admin page for Spaces',
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-full">
			<AdminNav />
			<div className="flex w-full flex-col">
				<AdminHeader />
				<section className="py-10 px-16">{children}</section>
			</div>
		</div>
	);
}
