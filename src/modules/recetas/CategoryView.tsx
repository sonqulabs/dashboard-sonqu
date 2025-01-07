'use client';
import { useCategoryById } from 'raiz/src/hooks/useCategory';
import CategoryForm from './components/CategoryForm';

type TProductViewPageProps = {
	productId: string;
};

export default function CategoryView({ productId }: TProductViewPageProps) {
	const isNewProduct = productId === 'nuevo';

	const {
		data: product = null,
		isLoading,
		isError,
	} = useCategoryById(productId, isNewProduct);

	if (isLoading) return <h1>cargandooo...</h1>;
	if (isError) return <h1>error...</h1>;
	const pageTitle = isNewProduct
		? 'Crear Categoría de Receta'
		: 'Editar Categoría de Receta';
	const buttonTitle = isNewProduct ? 'Crear' : 'Editar';
	return (
		<CategoryForm
			initialData={product}
			pageTitle={pageTitle}
			buttonTitle={buttonTitle}
		/>
	);
}
