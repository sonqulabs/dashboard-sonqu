'use client';
import { Checkbox } from '@shadcnui/checkbox';
import { User } from '@/common/interfaces/index';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<User>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
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
		accessorKey: 'cel',
		header: 'CELULAR',
	},
	{
		accessorKey: 'email',
		header: 'EMAIL',
	},
	{
		accessorKey: 'role',
		header: 'ROL',
	},
	{
		accessorKey: 'active',
		header: 'ESTADO',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
