type Permisos = {
	name: string;
	permission: {
		create: boolean;
		delete: boolean;
		find: boolean;
		update: boolean;
	};
};

export type Roles = {
	id?: number;
	name: string;
	permission: Permisos[];
};
// Definir un tipo con solo id y name de Roles
type RoleBasicInfo = Pick<Roles, 'id'> & Partial<Pick<Roles, 'name'>>;

export type User = {
	photo_url?: string;
	name?: string;
	created_at?: string;
	id?: number | string;
	updated_at?: string;
	role?: RoleBasicInfo;
	phone: string;
	password?: string;
	state?: string;
	email?: string | null;
	username?: string;
};
