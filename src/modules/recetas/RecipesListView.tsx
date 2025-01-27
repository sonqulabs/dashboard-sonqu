'use client';

import React from 'react';
// import RecipesListForm from './components/RecipesListForm';
import { Heading } from 'raiz/src/common/components/customize/Heading';
import { DataTableListaRecetas } from 'raiz/src/app/(dashboard)/recetas/lista-recetas/data-table';
import { useRecipes } from 'raiz/src/hooks/use-recipes';
import { columnsListaRecetas } from 'raiz/src/app/(dashboard)/recetas/lista-recetas/columns';

export const RecipesListView = () => {
	const { data } = useRecipes();
	return (
		<div className="container mx-auto pb-10 pt-5">
			<Heading title={`Lista de recetas (${data.length})`} />
			<DataTableListaRecetas
				columns={columnsListaRecetas}
				data={data.toReversed()}
			/>

			{/* <RecipesListForm /> */}
		</div>
	);
};
