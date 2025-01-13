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

	const createRecipe = async (data: Recipes): Promise<Recipes> => {
		configRequest({ endpoint: 'recipe' });
		const res = await post<Recipes>(data);

		return res;
	};
	const updateRecipe = async (data: Recipes, id: string): Promise<Recipes> => {
		configRequest({ endpoint: `recipe/${id}` });
		const res = await put<Recipes>(data);

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
