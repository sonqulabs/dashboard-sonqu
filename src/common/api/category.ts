import { Category } from '../interfaces/recetas';
import { FotosService } from '../services/caasd2.service';
import CategoryService from '../services/category.service';

const service = new CategoryService();

export const getCategoryFunctiontest = async () => {
	const { getCategory } = await FotosService();
	return getCategory();
};

export const getCategoryFunction = async () => {
	const response = await service.getCategory();
	return response;
};
export const getCategoryByIdFunction = async (id: string) => {
	const response = await service.getCategoryById(id);
	return response;
};

export const createCategoryFunction = async (data: Omit<Category, 'id'>) => {
	const response = await service.createCategory(data);
	return response;
};

export const updateCategoryFunction = async (
	id: number,
	data: Partial<Category>
) => {
	const response = await service.updateCategory(id, data);
	return response;
};

export const deleteFunction = async (id: number) => {
	const response = await service.deleteCategory(id);
	return response;
};
