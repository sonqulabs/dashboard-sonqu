import GroupRecipesView from 'raiz/src/modules/config/GroupRecipesView';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <GroupRecipesView productId={id} />;
}
