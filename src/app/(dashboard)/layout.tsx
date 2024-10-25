// import { redirect } from 'next/navigation';

import AppSidebar from '@/common/components/layoutAdmin/AppSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sistema Sonqu',
	description: 'Sistema web de Sonqu',
};

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppSidebar>{children}</AppSidebar>;
}
