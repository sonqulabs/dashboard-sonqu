import GroupRecipesView from 'raiz/src/modules/config/GroupRecipesView';

type paramsType = Promise<{ id: string }>;
export default async function Page({ params }: { params: paramsType }) {
	const { id } = await params;
	return <GroupRecipesView productId={id} />;
}
