'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import { Badge } from 'raiz/src/common/components/shadcnui/badge';
import { getImageRecipe } from 'raiz/src/common/helpers/getImageUrl';
import { RecipesPending } from 'raiz/src/common/interfaces/recetas';
import { ActionsPendingRecipes } from 'raiz/src/modules/recetas/components/ActionsRecipesPending';
// import { CategoryActions } from 'raiz/src/modules/recetas/components/categoryActions';

export const columnsPendientesRecetas: ColumnDef<RecipesPending>[] = [
	{
		accessorKey: 'title',
		header: () => <div className="pl-4">Receta</div>,
		cell: ({ row }) => {
			// Obtener valores de la fila
			const imageUrl = row.original.imageUrl as string;
			const alt = (row.original.title as string) || 'Imagen de receta';

			// Verificar si la receta es nueva (últimos 7 días)
			const createdAt = row.original.createdAt
				? new Date(row.original.createdAt)
				: null;
			const now = new Date();
			const isNew = createdAt
				? (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) <= 2
				: false;

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
							className="rounded-xl w-[50px] h-[50px] object-cover shadow-md"
						/>
						<div>
							<div className="font-medium">{row.original.title}</div>
							{isNew && (
								<Badge
									variant="outline"
									className="bg-emerald-100 text-emerald-700 border-0 flex items-center gap-1 mt-1 w-min whitespace-nowrap"
								>
									<Sparkles className="h-3 w-3" />
									Nuevo
								</Badge>
							)}

							{/* <span className="mt-0.5 text-xs text-muted-foreground">
								{row.original.user?.username}
							</span> */}
						</div>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'user',
		header: () => <div className="pl-4">Autor</div>,
		cell: ({ row }) => {
			const username = row.original.publicUserName || 'Anónimo';
			// const initial = username.charAt(0).toUpperCase();
			const roles = row.original.publicUserPhone || 'sin teléfono';
			return (
				<div className="pl-4 min-w-[200px]">
					<div className="flex items-center gap-3">
						{/* Avatar con inicial */}
						{/* <div className="h-8 w-8  flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold text-sm">
							{initial}
						</div> */}
						{/* Nombre del usuario */}
						<div className="flex flex-col gap-1">
							<span className="mt-0.5 text-sm font-medium">{username}</span>
							<Badge
								variant="outline"
								className=" bg-gray-100 text-gray-800 border-gray-200 w-min whitespace-nowrap"
							>
								{roles}
							</Badge>
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

			return <div className=" pl-4 min-w-[200px]">{formattedDate}</div>;
		},
	},
	{
		accessorKey: 'categories',
		header: () => <div className="pl-4">Categorías</div>,
		cell: ({ row }) => {
			// Obtener las categorías de la receta
			const categories = row.original.categories as {
				category: { name: string };
			}[];

			// Verificar si hay categorías
			if (!categories || categories.length === 0) {
				return <div className="pl-4 text-muted-foreground">Sin categorías</div>;
			}

			// Renderizar las categorías
			return (
				<div className="pl-4 flex flex-wrap gap-1 max-w-[300px] w-full">
					{categories.map((cat, index) => (
						<Badge
							key={index}
							variant="outline"
							className="bg-emerald-500 hover:bg-emerald-500 text-white border-0"
						>
							{cat.category.name}
						</Badge>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: 'servings',
		header: () => <div className="pl-4 ">Cantidad de Personas</div>,
		cell: ({ row }) => (
			<div className=" pl-4 flex items-center gap-1">
				<Users className="size-4" />
				{row.getValue('servings')}{' '}
			</div>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const data = row.original; // 👈 Aquí accedes a la receta completa

			return <ActionsPendingRecipes data={data} />;
		},
	},
];
