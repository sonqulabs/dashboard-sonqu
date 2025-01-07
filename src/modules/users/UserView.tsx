'use client';
import { useUserById } from 'raiz/src/hooks/useUsers';
import UserForm from './components/UserForm';

type TProductViewPageProps = {
	productId: string;
};

export default function UserView({ productId }: TProductViewPageProps) {
	const isNewProduct = productId === 'nuevo';

	const {
		data: product = null,
		isLoading,
		isError,
	} = useUserById(productId, isNewProduct);

	if (isLoading) return <h1>cargandooo...</h1>;
	if (isError) return <h1>error...</h1>;
	const pageTitle = isNewProduct ? 'Crear Usuario' : 'Editar Usuario';
	const buttonTitle = isNewProduct ? 'Crear' : 'Editar';
	return (
		<UserForm
			initialData={product}
			pageTitle={pageTitle}
			buttonTitle={buttonTitle}
		/>
	);
}
