/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Checkbox } from '@shadcnui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from 'raiz/src/common/components/shadcnui/badge';
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
		header: 'Nombre',
	},
	{
		accessorKey: 'phone',
		header: 'Celular',
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => {
			const email = row.original.email; // Obtiene el email de la fila

			return <span>{email ? email : '-----'}</span>;
		},
	},
	{
		accessorKey: 'role',
		header: () => <div>Rol</div>,
		cell: ({ row }) => (
			<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
				{row.original.role?.name}
			</Badge>
		),
	},
	{
		accessorKey: 'state',
		header: 'Cuenta',
		cell: ({ row }) => {
			const state = row.original.state; // O lo que sea que esté en tu fila para el estado
			let label = '';
			let colorClass = '';

			// Verifica el estado y asigna la etiqueta y el color
			if (state === 'active') {
				label = 'Activada';
				colorClass = 'bg-green-400 text-green-800 hover:bg-green-400'; // Verde para "Activo"
			} else if (state === 'disable') {
				label = 'Desactivado';
				colorClass = 'bg-red-400 text-red-800 hover:bg-red-400'; // Rojo para "Deshabilitado"
			}

			return (
				<Badge
					className={`max-w-[100px] text-center  !block w-full ${colorClass}`}
				>
					{label}
				</Badge>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
