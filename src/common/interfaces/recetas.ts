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
	image: File;
	videoUrl?: string;
	prepTime: number;
	servings: number;
	difficulty: string;
	ingredients?: string;
	instructions?: string;
	categories: string[];
	imageUrl?: string;
	createdAt?: string;
	updatedAt?: string;
	userId?: number;
};
