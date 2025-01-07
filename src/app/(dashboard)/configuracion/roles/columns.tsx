'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Roles } from 'raiz/src/common/interfaces/configuracion';
import { RolesActions } from 'raiz/src/modules/config/roles/components/RoleActions';

export const columnsRoles: ColumnDef<Roles>[] = [
	{
		accessorKey: 'name',
		header: () => <div className="pl-4">Nombre</div>,
		cell: ({ row }) => (
			<div className="w-fit text-start pl-4">{row.getValue('name')}</div>
		), // columna más ancha para nombres
	},
	{
		accessorKey: 'permissions',
		header: () => <div>Sección</div>,
		cell: ({ row }) => {
			const permissions = row.original.permission || [];
			return (
				<div className=" w-fit space-y-2 overflow-hidden">
					{permissions.map((perm) => (
						<div
							key={perm.name}
							className="bg-gray-800 text-white rounded-xl px-2 py-1 text-xs w-fit whitespace-nowrap"
						>
							{perm.name}
						</div>
					))}
				</div>
			);
		},
	},
	{
		id: 'create',
		header: () => <div className="text-center">Crear</div>,
		cell: ({ row }) => {
			const permissions = row.original.permission || [];
			return (
				<div className="  space-y-2">
					{permissions.map((perm) => (
						<div key={perm.name} className="text-center px-2 py-0.5">
							{perm.permission.create ? '✔️' : '❌'}
						</div>
					))}
				</div>
			);
		},
	},
	{
		id: 'delete',
		header: () => <div className="text-center">Eliminar</div>,
		cell: ({ row }) => {
			const permissions = row.original.permission || [];
			return (
				<div className="space-y-2">
					{permissions.map((perm) => (
						<div key={perm.name} className="text-center px-2 py-0.5">
							{perm.permission.delete ? '✔️' : '❌'}
						</div>
					))}
				</div>
			);
		},
	},
	{
		id: 'find',
		header: () => <div className="text-center">Buscar</div>,
		cell: ({ row }) => {
			const permissions = row.original.permission || [];
			return (
				<div className="space-y-2">
					{permissions.map((perm) => (
						<div key={perm.name} className="text-center px-2 py-0.5">
							{perm.permission.find ? '✔️' : '❌'}
						</div>
					))}
				</div>
			);
		},
	},
	{
		id: 'update',
		header: () => <div className="text-center">Actualizar</div>,
		cell: ({ row }) => {
			const permissions = row.original.permission || [];
			return (
				<div className="space-y-2">
					{permissions.map((perm) => (
						<div key={perm.name} className="text-center px-2 py-0.5">
							{perm.permission.update ? '✔️' : '❌'}
						</div>
					))}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return <RolesActions data={payment} />;
		},
	},
];
