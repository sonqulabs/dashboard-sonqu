import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from 'raiz/src/common/components/shadcnui/button';
import { Roles } from 'raiz/src/common/interfaces/configuracion';
import { useDeleteRole } from 'raiz/src/hooks/useRoles';
export const RolesActions = ({ data }: Props) => {
	const router = useRouter();

	const { mutation } = useDeleteRole();
	const id = data.id?.toString();

	const handleDelete = async () => {
		if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
			await mutation.mutateAsync(id!);
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
					onClick={() => router.push(`/configuracion/roles/${data.id}`)}
				>
					Editar
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>Borrar</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

type Props = {
	data: Roles;
};