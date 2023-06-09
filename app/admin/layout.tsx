// components
import AdminHeader from '#/components/admin/AdminHeader';
import AdminNav from '#/components/admin/AdminNav';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-full">
			<AdminNav />
			<div className="flex flex-col w-full">
				<AdminHeader />
				<section className="py-10 px-16">{children}</section>
			</div>
		</div>
	);
}
