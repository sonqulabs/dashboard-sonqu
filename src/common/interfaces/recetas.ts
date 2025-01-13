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
	imageUrl: File;
	videoUrl?: string;
	prepTime?: number;
	servings?: number;
	difficulty?: string;
	ingredients?: string;
	category?: string;
};
