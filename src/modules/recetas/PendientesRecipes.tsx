'use client';

import React from 'react';
import { Heading } from 'raiz/src/common/components/customize/Heading';
import { columnsPendientesRecetas } from 'raiz/src/app/(dashboard)/recetas/pendientes/columns';
import { DataTablePendingRecetas } from 'raiz/src/app/(dashboard)/recetas/pendientes/data-table';
import { usePendingRecipes } from 'raiz/src/hooks/usePendingRecipes';

export const RecipesPendingView = () => {
	const { data } = usePendingRecipes();
	return (
		<div className="container mx-auto pb-10 pt-5">
			<Heading title={`Recetas Pendientes del Público (${data.length})`} />
			<DataTablePendingRecetas
				columns={columnsPendientesRecetas}
				data={data.toReversed()}
			/>
		</div>
	);
};
