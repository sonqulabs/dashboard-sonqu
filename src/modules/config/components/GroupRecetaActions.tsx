import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteGroupFunction } from 'raiz/src/common/api/categoryGroup';
import { Button } from 'raiz/src/common/components/shadcnui/button';
import { CategoryGroup } from 'raiz/src/common/interfaces/recetas';
export const GroupRecetaActions = ({ data }: Props) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: number) => {
			return await deleteGroupFunction(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categoryGroups'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	const handleDelete = async () => {
		if (
			confirm('¿Estás seguro de que deseas eliminar este grupo de recetas?')
		) {
			await mutation.mutateAsync(data.id!);
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Acciones</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => router.push(`/configuracion/grupoReceta/${data.id}`)}
				>
					Editar
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>Borrar</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

type Props = {
	data: CategoryGroup;
};
