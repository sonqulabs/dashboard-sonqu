'use client';
import { columnsCategory } from 'raiz/src/app/(dashboard)/recetas/categorias/columns';
import { DataTableCategory } from 'raiz/src/app/(dashboard)/recetas/categorias/data-table';
import { Heading } from 'raiz/src/common/components/customize/Heading';
import { useCategory } from 'raiz/src/hooks/useCategory';

export const CategoriesView = () => {
	const { data } = useCategory();
	console.log('asdsadas:', data);
	return (
		<div className="container mx-auto py-10">
			<Heading title={`Lista de categorías (${data.length})`} />
			<DataTableCategory columns={columnsCategory} data={data.toReversed()} />
		</div>
	);
};
