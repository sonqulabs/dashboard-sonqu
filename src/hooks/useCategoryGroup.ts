import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CategoryGroupService } from '../common/services/categoryGroup.service';
import { CategoryGroup } from '../common/interfaces/recetas';

const {
	getCategoryGroup,
	createCategoryGroup,
	updateCategoryGroup,
	deleteCategoryGroup,
	getCategoryGroupById,
} = CategoryGroupService();

export const useCategoryGroup = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categoriesGroup'],
		queryFn: getCategoryGroup,
	});

	return { data, isLoading, isError };
};

export const useCategoryGroupById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['categoryGroupId', id],
		queryFn: () => getCategoryGroupById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateCategoryGroup = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: {
			id?: string;
			newCategory: Omit<CategoryGroup, 'id'>;
		}) => {
			if (data.id) {
				// Actualiza la categoría si hay un ID
				return await updateCategoryGroup(data.newCategory, data.id);
			} else {
				// Crea una nueva categoría si no hay ID
				return await createCategoryGroup(data.newCategory);
			}
		},
		onSuccess: () => {
			router.push('/configuracion/grupoReceta');
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};

export const useDeleteCategoryGroup = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteCategoryGroup(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categoriesGroup'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};
