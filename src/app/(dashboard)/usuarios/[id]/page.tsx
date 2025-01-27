import UserViewPage from '@/modules/users/UserView';

type paramsType = Promise<{ id: string }>;
export default async function Page({ params }: { params: paramsType }) {
	const { id } = await params;
	return <UserViewPage productId={id} />;
}
