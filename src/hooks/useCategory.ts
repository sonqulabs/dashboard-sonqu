import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '../common/services/category.service';
import { useRouter } from 'next/navigation';
import { Category } from '../common/interfaces/recetas';

const {
	getCategory,
	createCategory,
	getCategoryById,
	updateCategory,
	deleteCategory,
} = CategoryService();

export const useCategory = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: getCategory,
	});

	return { data, isLoading, isError };
};

export const useCategoryById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['categoryId', id],
		queryFn: () => getCategoryById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateCategory = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: {
			id?: string;
			newCategory: Omit<Category, 'id'>;
		}) => {
			if (data.id) {
				// Actualiza la categoría si hay un ID
				return await updateCategory(data.newCategory, data.id);
			} else {
				// Crea una nueva categoría si no hay ID
				return await createCategory(data.newCategory);
			}
		},
		onSuccess: () => {
			router.push('/recetas/categorias');
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteCategory(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};
