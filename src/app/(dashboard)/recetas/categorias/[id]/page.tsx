import CategoryView from 'raiz/src/modules/recetas/CategoryView';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <CategoryView productId={id} />;
}
