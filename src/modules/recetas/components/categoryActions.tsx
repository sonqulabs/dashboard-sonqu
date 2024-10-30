import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from 'raiz/src/common/components/shadcnui/button';
import { CategoryGroup } from 'raiz/src/common/interfaces/recetas';
export const CategoryActions = ({ data }: Props) => {
	const router = useRouter();
	const { data: session } = useSession();

	const handleDelete = async () => {
		if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_LOCALHOST}/category/${data.id}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${session?.user?.token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error('Error al eliminar el grupo de recetas.');
				}

				router.push('/recetas/categorias');
			} catch (error) {
				console.error('Error al eliminar el grupo de recetas:', error);
				alert('No se pudo eliminar el grupo de recetas.');
			}
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
					onClick={() => router.push(`/recetas/categorias/${data.id}`)}
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
