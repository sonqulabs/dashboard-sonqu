'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { getImageRecipe } from 'raiz/src/common/helpers/getImageUrl';
import { Recipes } from 'raiz/src/common/interfaces/recetas';
// import { CategoryActions } from 'raiz/src/modules/recetas/components/categoryActions';

export const columnsListaRecetas: ColumnDef<Recipes>[] = [
	{
		accessorKey: 'id',
		header: () => <div className="pl-4">Id</div>,
		cell: ({ row }) => <div className="pl-4 ">{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'imageUrl',
		header: () => <div className="pl-4">Imagen</div>,
		cell: ({ row }) => {
			// Obtener valores de la fila
			const imageUrl = row.getValue('imageUrl') as string;
			const alt = (row.getValue('title') as string) || 'Imagen de receta';

			// Verificar si hay imagen
			if (!imageUrl) {
				return <div className="pl-4">Sin imagen</div>;
			}

			// Renderizar la imagen
			return (
				<div className="pl-4">
					<Image
						src={getImageRecipe(imageUrl, 'small')} // Llama la función con los parámetros necesarios
						alt={alt}
						width={50}
						height={50}
						className="rounded-full w-[50px] h-[50px] object-cover"
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: () => <div className="pl-4">Fecha de creación</div>,
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

			return <div className=" pl-4">{formattedDate}</div>;
		},
	},
	{
		accessorKey: 'title',
		header: () => <div className="pl-4 ">Nombre de la Receta</div>,
		cell: ({ row }) => <div className=" pl-4">{row.getValue('title')}</div>, // columna más ancha para nombres
	},
	{
		accessorKey: 'userId',
		header: () => <div className="pl-4 ">Usuario</div>,
		cell: ({ row }) => (
			<div className="min-w-[200px] pl-4">{row.getValue('userId')}</div>
		), // columna más ancha para nombres
	},
	// {
	// 	accessorKey: 'categories',
	// 	header: () => <div className="">Grupo al que pertenece</div>,
	// 	cell: ({ row }) => (
	// 		<div className=" font-medium min-w-[50px] ">
	// 			{row.original.categories}
	// 		</div>
	// 	),
	// },
	// {
	// 	id: 'actions',
	// 	cell: ({ row }) => {
	// 		const payment = row.original;
	// 		return <CategoryActions data={payment} />;
	// 	},
	// },
];
