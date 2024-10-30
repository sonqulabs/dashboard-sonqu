import { Category } from '../interfaces/recetas';
import HttpRequest from './http-request.service';

class CategoryService extends HttpRequest {
	constructor() {
		super('category');
	}

	// Métodos CRUD para el recurso Category
	public async getCategory(): Promise<Category[]> {
		return this.get<Category[]>('category');
	}

	public async getCategoryById(id: string): Promise<Category> {
		return this.get<Category>(`category/${id}`);
	}

	public async createCategory(data: Omit<Category, 'id'>): Promise<Category> {
		return this.post<Category>('category', data);
	}

	public async updateCategory(
		id: number,
		data: Partial<Category>
	): Promise<Category> {
		return this.put<Category>(`category/${id}`, data);
	}

	public async deleteCategory(id: number): Promise<void> {
		return this.delete<void>(`category/${id}`);
	}
}

export default CategoryService;
