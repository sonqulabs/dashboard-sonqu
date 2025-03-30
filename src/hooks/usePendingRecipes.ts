/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RecipesPendingService } from '../common/services/recipePending.service';

const {
	getRecipes,
	getApproveRecipeById,
	updateRecipe,
	createRecipe,
	deleteRecipe,
} = RecipesPendingService();

export const usePendingRecipes = () => {
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

//falta actualizar esto a pending
export const useApproveRecipeById = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (id: any) => {
			return await getApproveRecipeById(id);
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
