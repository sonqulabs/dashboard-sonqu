export type Category = {
	id?: number;
	name: string;
	group?: {
		name?: string;
		id?: number;
	};
	groupId?: number;
};
export type CategoryGroup = {
	id?: number;
	name: string;
};

export type Recipes = {
	id?: number;
	title: string;
	description: string;
	image?: File;
	videoUrl?: string;
	prepTime?: number;
	servings: number;
	difficulty?: string;
	ingredients?: string;
	instructions?: string;
	categories:
		| string[] // Para la creación (solo nombres de categorías)
		| {
				recipeId: number;
				categoryId: number;
				category: {
					name: string;
				};
		  }[];
	imageUrl?: string;
	createdAt?: string;
	updatedAt?: string;
	userId?: number;
	user?: {
		id: number;
		username: string;
		role: {
			name: string;
		};
	};
};

export type RecipesEditar = {
	id?: number;
	title: string;
	description: string;
	image?: File;
	videoUrl?: string;
	prepTime: number;
	servings: number;
	difficulty: string;
	ingredients?: string;
	instructions?: string;
	categories:
		| string[] // Para la creación (solo nombres de categorías)
		| {
				recipeId: number;
				categoryId: number;
				category: {
					name: string;
				};
		  }[];
	imageUrl?: string;
	createdAt?: string;
	updatedAt?: string;
	userId?: number;
	user?: {
		id: number;
		username: string;
	};
};
