'use client';
import { Button } from '@shadcnui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from 'raiz/src/common/interfaces/configuracion';
import { useDeleteUser } from 'raiz/src/hooks/useUsers';

interface CellActionProps {
	data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const { mutation } = useDeleteUser();
	const id = data.id?.toString();

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
					<DropdownMenuItem onClick={() => router.push(`/usuarios/${data.id}`)}>
						<Edit className=" h-4 w-4" /> Editar
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleDelete}>
						<Trash2 className=" h-4 w-4" /> Borrar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
