import { CategoryGroup } from '../interfaces/recetas';
import { httpsRequest } from './http-request.service';

export const CategoryGroupService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getCategoryGroup = async (): Promise<CategoryGroup[]> => {
		configRequest({ endpoint: 'category-group' });
		const res = await get<CategoryGroup[]>();
		return res;
	};
	const getCategoryGroupById = async (id: string): Promise<CategoryGroup> => {
		configRequest({ endpoint: `category-group/${id}` });
		const res = await get<CategoryGroup>();
		return res;
	};

	const createCategoryGroup = async (
		data: CategoryGroup
	): Promise<CategoryGroup> => {
		configRequest({ endpoint: 'category-group' });
		const res = await post<CategoryGroup>(data);
		console.log(res);

		return res;
	};
	const updateCategoryGroup = async (
		data: CategoryGroup,
		id: string
	): Promise<CategoryGroup> => {
		configRequest({ endpoint: `category-group/${id}` });
		const res = await put<CategoryGroup>(data);
		console.log(res);

		return res;
	};
	const deleteCategoryGroup = async (id: string): Promise<void> => {
		configRequest({ endpoint: `category-group/${id}` });
		await deleteRequest();
	};

	return {
		getCategoryGroup,
		createCategoryGroup,
		updateCategoryGroup,
		deleteCategoryGroup,
		getCategoryGroupById,
	};
};
