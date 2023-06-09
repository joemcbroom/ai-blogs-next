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
				<section className="h-full px-16 py-10">{children}</section>
			</div>
		</div>
	);
}
