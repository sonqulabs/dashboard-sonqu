import UserViewPage from '@/modules/users/UserView';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <UserViewPage productId={id} />;
}
