import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { UsersService } from '../common/services/users.service';
import { User } from '../common/interfaces/configuracion';

const {
	getUser,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
	deleteUserIds,
} = UsersService();

export const useUser = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['users'],
		queryFn: getUser,
	});

	return { data, isLoading, isError };
};

export const useUserById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['userId', id],
		queryFn: () => getUserById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateUser = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: { id?: string; newUser: Omit<User, 'id'> }) => {
			if (data.id) {
				return await updateUser(data.newUser, data.id);
			} else {
				return await createUser(data.newUser);
			}
		},
		onSuccess: () => {
			router.push('/usuarios');
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteUser(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el usuario', error);
		},
	});

	return { mutation };
};

export const useDeleteIdsUser = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string[]) => {
			return await deleteUserIds(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el usuario', error);
		},
	});

	return { mutation };
};
