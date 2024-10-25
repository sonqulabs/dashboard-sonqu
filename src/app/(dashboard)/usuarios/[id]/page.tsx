import UserViewPage from '@/modules/users/UserView';

export const metadata = {
	title: 'Dashboard : Product View',
};

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <UserViewPage productId={id} />;
}
