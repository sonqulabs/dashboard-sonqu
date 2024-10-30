'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoryGroup } from 'raiz/src/common/interfaces/recetas';
import { GroupRecetaActions } from 'raiz/src/modules/config/components/GroupRecetaActions';

export const columnsCategoryGroup: ColumnDef<CategoryGroup>[] = [
	{
		accessorKey: 'name',
		header: () => <div className="pl-4">Nombre</div>,
		cell: ({ row }) => (
			<div className="min-w-[200px] pl-4">{row.getValue('name')}</div>
		), // columna más ancha para nombres
	},

	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return <GroupRecetaActions data={payment} />;
		},
	},
];
