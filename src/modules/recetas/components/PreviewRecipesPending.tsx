'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock, Users, ChefHat, Scale } from 'lucide-react';
import { Badge } from '@shadcnui/badge';
import { Button } from '@shadcnui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@shadcnui/dialog';
import { ScrollArea } from '@shadcnui/scroll-area';
import { RecipesPending } from 'raiz/src/common/interfaces/recetas';
import { getImageRecipe } from 'raiz/src/common/helpers/getImageUrl';

interface RecipeProps {
	open: boolean;
	data: RecipesPending;
	setOpen: (open: boolean) => void;
}
export const PreviewRecipesPending: React.FC<RecipeProps> = ({
	open,
	data,
	setOpen,
}) => {
	const rawDate = data.createdAt;

	const imageUrl = data.imageUrl as string;

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
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-4xl h-[80vh] p-0">
				<ScrollArea className="max-h-[90vh]">
					<div className="p-6 space-y-6">
						<DialogHeader>
							<DialogTitle className="sr-only">
								Detalles de la Receta
							</DialogTitle>
							<DialogDescription className="hidden">
								Make changes to your profile here. Click save when youre done.
							</DialogDescription>
						</DialogHeader>

						{/* Header Section */}
						<div className="text-center space-y-4">
							<div className="flex justify-center gap-2 flex-wrap">
								{data?.categories?.map((category) => (
									<Badge
										key={category.categoryId}
										variant="secondary"
										className="bg-orange-100 text-orange-800"
									>
										{category.category.name}
									</Badge>
								))}
							</div>
							<h2 className="text-3xl font-bold text-gray-900">{data.title}</h2>
							<div className="flex justify-center items-center gap-4 text-gray-600 flex-wrap">
								<span className="flex items-center gap-1">
									<ChefHat className="h-5 w-5 text-orange-500" />
									{data.user?.username || 'anónimo'}
								</span>
								<span className="flex items-center gap-1">
									<Clock className="h-5 w-5 text-orange-500" />
									{formattedDate}
								</span>
								<span className="flex items-center gap-1">
									<Users className="h-5 w-5 text-orange-500 mb-1" />
									<p>{data.servings} Porciones</p>
								</span>
							</div>
						</div>

						{/* Main Image */}
						<div className="p-4">
							<div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
								<Image
									src={getImageRecipe(imageUrl, 'medium')}
									alt="asds"
									className="object-cover w-full"
									width={500}
									height={500}
								/>
							</div>
						</div>

						{/* Description */}
						<div className="p-4">
							<h3 className="text-xl font-semibold mb-3 text-gray-800">
								Descripción
							</h3>
							<p className="text-gray-700 leading-relaxed">
								{data.description}
							</p>
						</div>

						<div className="p-4">
							<h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
								<Scale className="h-5 w-5 text-orange-500" />
								Ingredientes
							</h3>
							<ul className="grid grid-cols-2 gap-2 ">
								{Array.isArray(data.ingredients) &&
									data.ingredients
										.flatMap(({ name }) => {
											if (typeof name !== 'string') return [];

											// Convertir HTML a texto sin etiquetas
											const parser = new DOMParser();
											const doc = parser.parseFromString(name, 'text/html');

											// Extraer el contenido de los párrafos
											return Array.from(doc.body.querySelectorAll('p'))
												.map((p) => p.textContent?.trim()) // Obtener texto limpio
												.filter(
													(text) =>
														text &&
														!text.includes('Ingredientes') &&
														!text.includes('Para el ají') &&
														!text.includes('porciones')
												); // Filtrar títulos y etiquetas innecesarias
										})
										.map((ingredient, index) => (
											<li
												key={index}
												className="flex items-center gap-2 text-gray-700"
											>
												<span className="h-2 w-2 rounded-full bg-orange-400" />
												{ingredient}
											</li>
										))}
							</ul>
						</div>

						{/* Instructions */}
						<div className="p-4">
							<h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
								<ChefHat className="h-5 w-5 text-orange-500" />
								Preparación
							</h3>
							<ol className="space-y-3 list-decimal list-inside">
								{Array.isArray(data.instructions) &&
									data.instructions
										.flatMap(({ description }) => {
											if (typeof description !== 'string') return [];

											// Convertir HTML a texto sin etiquetas
											const parser = new DOMParser();
											const doc = parser.parseFromString(
												description,
												'text/html'
											);

											// Extraer los pasos de la receta desde los <li>
											return Array.from(doc.body.querySelectorAll('li'))
												.map((li) => li.textContent?.trim()) // Obtener texto limpio
												.filter(
													(text) => text && !text.includes('Preparación')
												); // Filtrar títulos
										})
										.map((step, index) => (
											<li key={index} className="text-gray-700">
												<span>{step}</span>
											</li>
										))}
							</ol>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
