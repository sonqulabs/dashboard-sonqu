import { auth } from 'raiz/auth';
import CategoryForm from './components/CategoryForm';
import { notFound } from 'next/navigation';

type TProductViewPageProps = {
	productId: string;
};

export default async function CategoryView({
	productId,
}: TProductViewPageProps) {
	const session = await auth();
	let product = null;
	let pageTitle = 'Crear Categoría';
	let buttonTitle = 'Crear';

	if (productId !== 'nuevo') {
		pageTitle = `Editar Categoría`;
		buttonTitle = 'Editar';

		const res = await fetch(
			`${process.env.API_LOCALHOST}/category/${productId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${session?.user.token}`,
				},
			}
		);
		const data = await res.json();
		if (!data) {
			notFound();
		}
		product = data;
	}

	return (
		<CategoryForm
			initialData={product}
			pageTitle={pageTitle}
			buttonTitle={buttonTitle}
		/>
	);
}
