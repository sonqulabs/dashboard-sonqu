'use client';
import { Button } from '@shadcnui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Recipes } from 'raiz/src/common/interfaces/recetas';
import { ModalEditorForm } from './ModalEditarForm';
import { useState } from 'react';
import { PreviewRecipes } from './PreviewRecipes';
import { useDeleteRecipe } from 'raiz/src/hooks/use-recipes';

interface CellActionProps {
	data: Recipes;
}

export const ActionsRecipes: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const { mutation } = useDeleteRecipe();
	const id = data?.id?.toString();
	const [open, setOpen] = useState(false); // Estado para controlar el modal
	const [openPreview, setOpenPreview] = useState(false); //estado de preview

	const handleDelete = async () => {
		if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
			await mutation.mutateAsync(id!);
		}
	};
	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setOpenPreview(true)}>
						<Eye className="h-4 w-4 mr-2" /> ver
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Edit className="h-4 w-4 mr-2" /> Editar
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleDelete}>
						<Trash2 className="h-4 w-4 mr-2" /> Borrar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Mantén el modal fuera del DropdownMenu */}
			<ModalEditorForm open={open} setOpen={setOpen} data={data} />
			<PreviewRecipes open={openPreview} setOpen={setOpenPreview} data={data} />
		</>
	);
};
