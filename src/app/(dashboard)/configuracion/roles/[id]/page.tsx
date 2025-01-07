import RoleView from 'raiz/src/modules/config/roles/RoleView';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <RoleView productId={id} />;
}
