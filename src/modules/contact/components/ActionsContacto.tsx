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
import { useState } from 'react';
import { Contacto } from '../types';
import { useDeleteContact } from 'raiz/src/hooks/useContacto';
import { PreviewContacto } from './PreviewContacto';

interface CellActionProps {
	data: Contacto;
}

export const ActionsContacto: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const { mutation } = useDeleteContact();
	const id = data?.id?.toString();
	const [open, setOpen] = useState(false); // Estado para controlar el modal
	const [openPreview, setOpenPreview] = useState(false); //estado de preview

	const handleDelete = async () => {
		if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
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

					<DropdownMenuItem onClick={handleDelete}>
						<Trash2 className="h-4 w-4 mr-2" /> Borrar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Mantén el modal fuera del DropdownMenu */}
			<PreviewContacto
				open={openPreview}
				setOpen={setOpenPreview}
				data={data}
			/>
		</>
	);
};
