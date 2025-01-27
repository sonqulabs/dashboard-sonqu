/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Checkbox } from '@shadcnui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { User } from 'raiz/src/common/interfaces/configuracion';
import { CellAction } from 'raiz/src/modules/users/components/cell-action';

export const columnsUser: ColumnDef<any>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'username',
		header: 'NOMBRE',
	},
	{
		accessorKey: 'phone',
		header: 'CELULAR',
	},
	{
		accessorKey: 'email',
		header: 'EMAIL',
	},
	{
		accessorKey: 'role',
		header: () => <div>ROLE</div>,
		cell: ({ row }) => <div>{row.original.role?.name}</div>,
	},

	{
		accessorKey: 'state',
		header: 'ESTADO',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
