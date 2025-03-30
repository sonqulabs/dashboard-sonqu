'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ActionsContacto } from 'raiz/src/modules/contact/components/ActionsContacto';
import { Contacto } from 'raiz/src/modules/contact/types';
// import { CategoryActions } from 'raiz/src/modules/recetas/components/categoryActions';

export const columnsContacto: ColumnDef<Contacto>[] = [
	{
		accessorKey: 'createdAt',
		header: () => <div className="pl-4">Fecha de Envío</div>,
		cell: ({ row }) => {
			// Obtener el valor original
			const rawDate = row.getValue('createdAt');

			// Verificar si es válido
			const formattedDate = rawDate
				? new Intl.DateTimeFormat('es-ES', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
				  }).format(new Date(rawDate as string))
				: 'Fecha no disponible';

			return <div className=" pl-4 min-w-[200px]">{formattedDate}</div>;
		},
	},

	{
		accessorKey: 'name',
		header: () => <div className="pl-4 ">Nombre</div>,
		cell: ({ row }) => (
			<div className=" pl-4 flex items-center gap-1">
				{row.getValue('name')}{' '}
			</div>
		),
	},
	{
		accessorKey: 'email',
		header: () => <div className="pl-4 ">Correo</div>,
		cell: ({ row }) => (
			<div className=" pl-4 flex items-center gap-1">
				{row.getValue('email')}{' '}
			</div>
		),
	},
	{
		accessorKey: 'message',
		header: () => <div className="pl-4 ">Mensaje</div>,
		cell: ({ row }) => (
			<div className=" pl-4 max-w-[400px] line-clamp-1">
				{row.getValue('message')}
			</div>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const data = row.original; // 👈 Aquí accedes a la receta completa

			return <ActionsContacto data={data} />;
		},
	},
];
