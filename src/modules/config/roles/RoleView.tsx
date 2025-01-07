'use client';
import { useRoleById } from 'raiz/src/hooks/useRoles';
import RoleForm from './components/RoleForm';

type TProductViewPageProps = {
	productId: string;
};

export default function RoleView({ productId }: TProductViewPageProps) {
	const isNewProduct = productId === 'nuevo';

	const {
		data: product = null,
		isLoading,
		isError,
	} = useRoleById(productId, isNewProduct);
	if (isLoading) return <h1>cargandooo...</h1>;
	if (isError) return <h1>error...</h1>;
	const pageTitle = isNewProduct ? 'Crear Rol' : 'Editar Rol';
	const buttonTitle = isNewProduct ? 'Crear' : 'Editar';
	return (
		<RoleForm
			initialData={product}
			pageTitle={pageTitle}
			buttonTitle={buttonTitle}
		/>
	);
}
