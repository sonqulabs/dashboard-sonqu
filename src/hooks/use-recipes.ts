import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RecipesService } from '../common/services/recipes.service';

const { getRecipes, getRecipeById, updateRecipe, createRecipe, deleteRecipe } =
	RecipesService();

export const useRecipes = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['recipes'],
		queryFn: getRecipes,
	});

	return { data, isLoading, isError };
};

export const useRecipeById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['recipeId', id],
		queryFn: () => getRecipeById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

// export const useCreateOrUpdateRecipe = () => {
// 	const router = useRouter();

// 	const mutation = useMutation({
// 		mutationFn: async (data: {
// 			id?: string;
// 			newCategory: Omit<Recipes, 'id'>;
// 		}) => {
// 			if (data.id) {
// 				return await updateRecipe(data.newCategory, data.id);
// 			} else {
// 				return await createRecipe(data.newCategory);
// 			}
// 		},
// 		onSuccess: () => {
// 			router.push('/recetas/lista-recetas');
// 		},
// 		onError: (error) => {
// 			console.error('Error al crear o editar el grupo de categoría:', error);
// 		},
// 	});

// 	return { mutation };
// };
export const useCreateRecipe = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			return await createRecipe(data);
		},
		onSuccess: () => {
			router.push('/recetas/lista-recetas');
		},
		onError: (error) => {
			console.error('Error al crear la receta:', error);
		},
	});

	return { mutation };
};

export const useUpdateRecipe = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async ({ data, id }: { data: FormData; id: string }) => {
			return await updateRecipe(data, id);
		},
		onSuccess: () => {
			router.push('/recetas/lista-recetas');
		},
		onError: (error) => {
			console.error('Error al actualizar la receta:', error);
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
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};
