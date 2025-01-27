import RoleView from 'raiz/src/modules/config/roles/RoleView';

type paramsType = Promise<{ id: string }>;
export default async function Page({ params }: { params: paramsType }) {
	const { id } = await params;
	return <RoleView productId={id} />;
}
