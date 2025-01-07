'use client';
import { useCategoryGroupById } from 'raiz/src/hooks/useCategoryGroup';
import GroupRecipesForm from './components/GroupRecipesForm';

type TProductViewPageProps = {
	productId: string;
};

export default function GroupRecipesView({ productId }: TProductViewPageProps) {
	const isNewProduct = productId === 'nuevo';
	const {
		data: product = null,
		isLoading,
		isError,
	} = useCategoryGroupById(productId, isNewProduct);

	if (isLoading) return <h1>cargandooo...</h1>;
	if (isError) return <h1>error...</h1>;

	// Configuración de títulos
	const pageTitle = isNewProduct
		? 'Crear Grupo de Receta'
		: 'Editar Grupo de Receta';
	const buttonTitle = isNewProduct ? 'Crear' : 'Editar';

	return (
		<GroupRecipesForm
			initialData={isNewProduct ? null : product}
			pageTitle={pageTitle}
			buttonTitle={buttonTitle}
		/>
	);
}
