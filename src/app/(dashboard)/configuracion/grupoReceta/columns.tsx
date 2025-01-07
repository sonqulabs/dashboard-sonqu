'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from 'raiz/src/common/components/shadcnui/checkbox';
import { CategoryGroup } from 'raiz/src/common/interfaces/recetas';
import { GroupRecetaActions } from 'raiz/src/modules/config/components/GroupRecetaActions';

export const columnsCategoryGroup: ColumnDef<CategoryGroup>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className="pl-4 ">
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className=" pl-4  ">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: () => <div>Nombre</div>,
		cell: ({ row }) => (
			<div className="min-w-[200px] ">{row.getValue('name')}</div>
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
