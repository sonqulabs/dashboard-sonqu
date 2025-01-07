'use client';
import { columnsCategoryGroup } from 'raiz/src/app/(dashboard)/configuracion/grupoReceta/columns';
import { DataTableGrupoReceta } from 'raiz/src/app/(dashboard)/configuracion/grupoReceta/data-table';
import { useCategoryGroup } from 'raiz/src/hooks/useCategoryGroup';

export const CategoriesGroupView = () => {
	const { data } = useCategoryGroup();
	return (
		<DataTableGrupoReceta
			columns={columnsCategoryGroup}
			data={data.toReversed()}
		/>
	);
};
