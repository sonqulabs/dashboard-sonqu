import CategoryView from 'raiz/src/modules/recetas/CategoryView';

type paramsType = Promise<{ id: string }>;
export default async function Page({ params }: { params: paramsType }) {
	const { id } = await params;
	return <CategoryView productId={id} />;
}
