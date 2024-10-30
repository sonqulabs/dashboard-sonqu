import { CategoryGroup } from '../interfaces/recetas';
import CategoryGroupService from '../services/categoryGroup.service';

const service = new CategoryGroupService();

export const getCategoryGroupFunction = async () => {
	const response = await service.getCategoryGroup();
	return response;
};
export const getCategoryGroupByIdFunction = async (id: string) => {
	const response = await service.getCategoryGroupById(id);
	return response;
};

export const createCategoryGroupFunction = async (
	data: Omit<CategoryGroup, 'id'>
) => {
	const response = await service.createCategoryGroup(data);
	return response;
};

export const updateCategoryGroupFunction = async (
	id: number,
	data: Partial<CategoryGroup>
) => {
	const response = await service.updateCategoryGroup(id, data);
	return response;
};

export const deleteGroupFunction = async (id: number) => {
	const response = await service.deleteCategoryGroup(id);
	return response;
};
