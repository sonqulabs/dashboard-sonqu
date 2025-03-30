'use client';
import { Button } from '@shadcnui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import { Edit, Eye, MoreHorizontal, ShieldCheck, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RecipesPending } from 'raiz/src/common/interfaces/recetas';
import { ModalEditorForm } from './ModalEditarForm';
import { useState } from 'react';
import { PreviewRecipes } from './PreviewRecipes';
import { useDeleteRecipe } from 'raiz/src/hooks/use-recipes';
import { useApproveRecipeById } from 'raiz/src/hooks/usePendingRecipes';
import { PreviewRecipesPending } from './PreviewRecipesPending';

interface CellActionProps {
	data: RecipesPending;
}

export const ActionsPendingRecipes: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const { mutation } = useApproveRecipeById();
	const id = data?.id?.toString();
	const [open, setOpen] = useState(false); // Estado para controlar el modal
	const [openPreview, setOpenPreview] = useState(false); //estado de preview

	const handleApprove = async () => {
		if (confirm('¿Estás seguro de que deseas aprobar esta receta?')) {
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

					<DropdownMenuItem onClick={handleApprove}>
						<ShieldCheck className="h-4 w-4 mr-2" />
						Aprobar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<PreviewRecipesPending
				open={openPreview}
				setOpen={setOpenPreview}
				data={data}
			/>
		</>
	);
};
