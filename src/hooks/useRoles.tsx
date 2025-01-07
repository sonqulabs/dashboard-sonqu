import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Roles } from '../common/interfaces/configuracion';
import { RolesService } from '../common/services/roles.service';

const { getRole, createRole, getRoleById, updateRole, deleteRole } =
	RolesService();

export const useRole = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['roles'],
		queryFn: getRole,
	});

	return { data, isLoading, isError };
};

export const useRoleById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['roleId', id],
		queryFn: () => getRoleById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateRole = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: { id?: string; newRole: Omit<Roles, 'id'> }) => {
			if (data.id) {
				return await updateRole(data.newRole, data.id);
			} else {
				return await createRole(data.newRole);
			}
		},
		onSuccess: () => {
			router.push('/configuracion/roles');
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};

export const useDeleteRole = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteRole(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['roles'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};
