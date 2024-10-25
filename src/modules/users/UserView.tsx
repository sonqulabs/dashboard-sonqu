import UserForm from './components/UserForm';

type TProductViewPageProps = {
	productId: string;
};

export default async function UserViewPage({
	productId,
}: TProductViewPageProps) {
	const product = null;
	let pageTitle = 'Crear Nuevo Usuario';

	if (productId !== 'nuevo') {
		pageTitle = `Edit Product`;
	}

	return <UserForm initialData={product} pageTitle={pageTitle} />;
}
