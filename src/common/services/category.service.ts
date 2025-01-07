import { Category } from '../interfaces/recetas';
import { httpsRequest } from './http-request.service';

export const CategoryService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getCategory = async (): Promise<Category[]> => {
		configRequest({ endpoint: 'category' });
		const res = await get<Category[]>();
		return res;
	};

	const getCategoryById = async (id: string): Promise<Category> => {
		configRequest({ endpoint: `category/${id}` });
		const res = await get<Category>();
		return res;
	};

	const createCategory = async (data: Category): Promise<Category> => {
		configRequest({ endpoint: 'category' });
		const res = await post<Category>(data);

		return res;
	};
	const updateCategory = async (
		data: Category,
		id: string
	): Promise<Category> => {
		configRequest({ endpoint: `category/${id}` });
		const res = await put<Category>(data);

		return res;
	};
	const deleteCategory = async (id: string): Promise<void> => {
		configRequest({ endpoint: `category/${id}` });
		await deleteRequest();
	};

	return {
		getCategory,
		getCategoryById,
		createCategory,
		updateCategory,
		deleteCategory,
	};
};
