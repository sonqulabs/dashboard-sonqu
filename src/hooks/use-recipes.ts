import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Recipes } from '../common/interfaces/recetas';
import { RecipesService } from '../common/services/recipes.service';

const { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } =
	RecipesService();

export const useRecipes = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: getRecipes,
	});

	return { data, isLoading, isError };
};

export const useRecipeById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['categoryId', id],
		queryFn: () => getRecipeById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateRecipe = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: {
			id?: string;
			newCategory: Omit<Recipes, 'id'>;
		}) => {
			if (data.id) {
				// Actualiza la categoría si hay un ID
				return await updateRecipe(data.newCategory, data.id);
			} else {
				// Crea una nueva categoría si no hay ID
				return await createRecipe(data.newCategory);
			}
		},
		onSuccess: () => {
			router.push('/recetas/lista-recetas');
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};

export const useDeleteRecipe = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteRecipe(id);
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
