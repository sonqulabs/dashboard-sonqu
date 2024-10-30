import { CategoryGroup } from '../interfaces/recetas';
import HttpRequest from './http-request.service';

class CategoryGroupService extends HttpRequest {
	constructor() {
		// Inicia HttpRequest con el microservicio específico "usuarios"
		super('categoryGroup');
	}

	// Métodos CRUD para el recurso CategoryGroup
	public async getCategoryGroup(): Promise<CategoryGroup[]> {
		return this.get<CategoryGroup[]>('category-group'); // Usa el endpoint para obtener lista de usuarios
	}

	public async getCategoryGroupById(id: string): Promise<CategoryGroup> {
		return this.get<CategoryGroup>(`category-group/${id}`); // Usa el endpoint para obtener un usuario por ID
	}

	public async createCategoryGroup(
		data: Omit<CategoryGroup, 'id'>
	): Promise<CategoryGroup> {
		return this.post<CategoryGroup>('category-group', data); // Usa el endpoint para crear un nuevo usuario
	}

	public async updateCategoryGroup(
		id: number,
		data: Partial<CategoryGroup>
	): Promise<CategoryGroup> {
		return this.put<CategoryGroup>(`category-group/${id}`, data); // Usa el endpoint para actualizar un usuario
	}

	public async deleteCategoryGroup(id: number): Promise<void> {
		return this.delete<void>(`category-group/${id}`); // Usa el endpoint para eliminar un usuario
	}
}

export default CategoryGroupService;
