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
import { getImageRecipe } from 'raiz/src/common/helpers/getImageUrl';
import { Contacto } from '../types';

interface RecipeProps {
	open: boolean;
	data: Contacto;
	setOpen: (open: boolean) => void;
}
export const PreviewContacto: React.FC<RecipeProps> = ({
	open,
	data,
	setOpen,
}) => {
	const rawDate = data.createdAt;

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
			<DialogContent className="max-w-sm h-auto p-0">
				<ScrollArea className="max-h-[65vh]">
					<div className="p-6 ">
						<DialogHeader className="hidden">
							<DialogTitle>Detalles de la Receta</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when youre done.
							</DialogDescription>
						</DialogHeader>

						<div className="gap-5 flex flex-col justify-center items-center text-center">
							<div>
								<h3 className="text-sm font-semibold text-gray-600">
									Fecha de Envío
								</h3>
								<p className="text-sm text-gray-900">{formattedDate}</p>
							</div>

							<div>
								<h3 className="text-sm font-semibold text-gray-600">Nombre</h3>
								<p className="text-sm  text-gray-900">{data.name}</p>
							</div>
							<div>
								<h3 className="text-sm font-semibold text-gray-600">Correo</h3>
								<p className="text-sm text-gray-900">{data.email}</p>
							</div>
							<div>
								<h3 className="text-sm font-semibold text-gray-600 mb-2">
									Mensaje
								</h3>
								<p className="text-sm text-gray-800 ">{data.message}</p>
							</div>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
