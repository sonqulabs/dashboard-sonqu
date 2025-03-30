'use client';

import React from 'react';
// import RecipesListForm from './components/RecipesListForm';
import { Heading } from 'raiz/src/common/components/customize/Heading';
import { DataTableContacto } from 'raiz/src/app/(dashboard)/contacto/data-table';
import { columnsContacto } from 'raiz/src/app/(dashboard)/contacto/columns';
import { useContact } from 'raiz/src/hooks/useContacto';

export const ContactListView = () => {
	const { data } = useContact();
	return (
		<div className="container mx-auto pb-10 pt-5">
			<Heading title={`Solicitudes de mensajes (${data.length})`} />
			<DataTableContacto columns={columnsContacto} data={data.toReversed()} />

			{/* <RecipesListForm /> */}
		</div>
	);
};
