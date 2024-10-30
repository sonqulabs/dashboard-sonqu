'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Category } from 'raiz/src/common/interfaces/recetas';
import { CategoryActions } from 'raiz/src/modules/recetas/components/categoryActions';

export const columnsCategory: ColumnDef<Category>[] = [
	// {
	// 	accessorKey: 'id',
	// 	header: () => <div className="pl-4">Id</div>,
	// 	cell: ({ row }) => <div className="pl-4 ">{row.getValue('id')}</div>,
	// },
	{
		accessorKey: 'name',
		header: () => <div className="pl-4 ">Nombre</div>,
		cell: ({ row }) => (
			<div className="min-w-[200px] pl-4">{row.getValue('name')}</div>
		), // columna más ancha para nombres
	},
	{
		accessorKey: 'group',
		header: () => <div className="">Grupo al que pertenece</div>,
		cell: ({ row }) => (
			<div className=" font-medium min-w-[50px] ">
				{row.original.group?.name}
			</div>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return <CategoryActions data={payment} />;
		},
	},
];
