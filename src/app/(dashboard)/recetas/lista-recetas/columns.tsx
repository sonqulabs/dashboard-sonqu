'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PersonStanding } from 'lucide-react';
import Image from 'next/image';
import { Badge } from 'raiz/src/common/components/shadcnui/badge';
import { getImageRecipe } from 'raiz/src/common/helpers/getImageUrl';
import { Recipes } from 'raiz/src/common/interfaces/recetas';
// import { CategoryActions } from 'raiz/src/modules/recetas/components/categoryActions';

export const columnsListaRecetas: ColumnDef<Recipes>[] = [
	{
		accessorKey: 'title',
		header: () => <div className="pl-4">Imagen</div>,
		cell: ({ row }) => {
			// Obtener valores de la fila
			const imageUrl = row.original.imageUrl as string;
			const alt = (row.original.title as string) || 'Imagen de receta';

			// Verificar si hay imagen
			if (!imageUrl) {
				return <div className="pl-4">Sin imagen</div>;
			}

			// Renderizar la imagen
			return (
				<div className="pl-4">
					<div className="flex items-center gap-3">
						<Image
							src={getImageRecipe(imageUrl, 'small')} // Llama la función con los parámetros necesarios
							alt={alt}
							width={50}
							height={50}
							className="rounded-full w-[50px] h-[50px] object-cover"
						/>
						<div>
							<div className="font-medium">{row.original.title}</div>
							<span className="mt-0.5 text-xs text-muted-foreground">
								{row.original.userId}
							</span>
						</div>
					</div>
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
		accessorKey: 'difficulty',
		header: () => <div className="pl-4">Dificultad</div>,
		cell: ({ row }) => {
			let difficulty = row.getValue('difficulty') as string;

			// Normalizar valores incorrectos
			const difficultyMap: Record<string, string> = {
				facil: 'fácil',
				fácil: 'fácil',
				medio: 'medio',
				intermedio: 'medio',
				dificil: 'difícil',
				difícil: 'difícil',
			};

			// Asignar valor normalizado o 'Desconocido'
			difficulty = difficultyMap[difficulty.toLowerCase()] || 'Desconocido';

			// Mapeo de colores según dificultad
			const difficultyColors: Record<string, string> = {
				fácil: 'bg-green-500 text-green-700 hover:bg-green-500',
				medio: 'bg-yellow-500 text-yellow-700 hover:bg-yellow-500',
				difícil: 'bg-red-400 text-red-800 hover:bg-red-400',
				desconocido: 'bg-gray-500 text-gray-700 hover:bg-gray-500',
			};

			const badgeClass = difficultyColors[difficulty];

			return (
				<div className="pl-4">
					<Badge className={` ${badgeClass}`}>{difficulty}</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'prepTime',
		header: () => <div className="pl-4 ">Tiempo de Preparación</div>,
		cell: ({ row }) => (
			<div className=" pl-4">{row.getValue('prepTime')} min</div>
		), // columna más ancha para nombres
	},
	{
		accessorKey: 'servings',
		header: () => <div className="pl-4 ">Cantidad de Personas</div>,
		cell: ({ row }) => (
			<div className=" pl-4 flex items-center gap-1">
				<PersonStanding />
				{row.getValue('servings')}{' '}
			</div>
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
