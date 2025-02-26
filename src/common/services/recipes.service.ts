import { Recipes } from '../interfaces/recetas';
import { httpsRequest } from './http-request.service';

export const RecipesService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getRecipes = async (): Promise<Recipes[]> => {
		configRequest({ endpoint: 'recipe' });
		const res = await get<Recipes[]>();
		return res;
	};

	const getRecipeById = async (id: string): Promise<Recipes> => {
		configRequest({ endpoint: `recipe/${id}` });
		const res = await get<Recipes>();
		return res;
	};

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
		getRecipeById,
		createRecipe,
		updateRecipe,
		deleteRecipe,
	};
};
