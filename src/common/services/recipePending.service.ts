/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipesPending } from '../interfaces/recetas';
import { httpsRequest } from './http-request.service';

export const RecipesPendingService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getRecipes = async (): Promise<RecipesPending[]> => {
		configRequest({ endpoint: 'pending-recipe' });
		const res = await get<RecipesPending[]>();
		return res;
	};

	const getApproveRecipeById = async (id: string): Promise<any> => {
		configRequest({ endpoint: `pending-recipe/pendingtorecipe/${id}` });
		const res = await post<any>({});
		return res;
	};

	//falta actualizar
	const createRecipe = async (data: FormData): Promise<FormData> => {
		configRequest({ endpoint: 'recipe' });
		const res = await post<FormData>(data);

		return res;
	};
	const updateRecipe = async (
		data: FormData,
		id: string
	): Promise<FormData> => {
		configRequest({ endpoint: `recipe/${id}` });
		const res = await put<FormData>(data);

		return res;
	};
	const deleteRecipe = async (id: string): Promise<void> => {
		configRequest({ endpoint: `recipe/${id}` });
		await deleteRequest();
	};

	return {
		getRecipes,
		getApproveRecipeById,
		createRecipe,
		updateRecipe,
		deleteRecipe,
	};
};
