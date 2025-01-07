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
